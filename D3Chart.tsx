import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { NodeData, Recipe, Season } from '../types';

interface D3ChartProps {
  nodes: NodeData[];
  recipes: Recipe[];
  currentSeason: Season;
  activeNodeId: string | null;
  onNodeHover: (id: string) => void;
  onNodeClick: (id: string) => void;
}

export const D3Chart: React.FC<D3ChartProps> = ({ 
  nodes, 
  recipes, 
  currentSeason, 
  activeNodeId, 
  onNodeHover,
  onNodeClick
}) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);

  // Redraw chart when dimensions, season changes, or window resizes
  useEffect(() => {
    if (!chartRef.current) return;

    const drawChart = () => {
        if (!chartRef.current) return;

        const width = chartRef.current.offsetWidth;
        const height = chartRef.current.offsetHeight;
        
        // Adjust radius calculation for smaller screens to ensure it fits
        const isMobile = width < 768;
        const padding = isMobile ? 40 : 120;
        const radius = Math.min(width, height) / 2 - padding;

        // Clear previous SVG
        d3.select(chartRef.current).select("svg").remove();

        const svg = d3.select(chartRef.current)
          .append("svg")
          .attr("width", width)
          .attr("height", height)
          .append("g")
          .attr("transform", `translate(${width / 2},${height / 2})`);
        
        svgRef.current = svg.node()?.parentNode as SVGSVGElement;

        // Cluster Layout
        const tree = d3.cluster<any>().size([360, radius]);
        
        // Hierarchical Data
        const rootData = {
            name: "root",
            children: ["SP", "SU", "AU", "WI"].map((s) => ({
                name: s,
                children: nodes.filter((n) => n.season === s),
            })),
        };

        const root = d3.hierarchy(rootData);
        tree(root);

        const leaves = root.leaves();
        const idToNode: { [key: string]: any } = {};
        leaves.forEach((d: any) => (idToNode[d.data.id] = d));

        // Line Generator
        const line = d3.lineRadial<any>()
          .curve(d3.curveBundle.beta(0.85))
          .radius((d) => d.y)
          .angle((d) => (d.x * Math.PI) / 180);

        // Links Data
        const linksData: any[] = [];
        recipes
          .filter((r) => r.primarySeason === currentSeason)
          .forEach((r) => {
            if (idToNode[r.ids[0]] && idToNode[r.ids[1]]) {
                linksData.push({
                    source: idToNode[r.ids[0]],
                    target: idToNode[r.ids[1]],
                    recipe: r,
                });
            }
          });

        // Draw Links
        const linkSelection = svg.append("g")
          .selectAll(".link")
          .data(linksData)
          .enter()
          .append("path")
          .attr("class", "link")
          .attr("d", (d) => line(d.source.path(d.target)));

        // Draw Nodes
        svg.append("g")
          .selectAll(".node")
          .data(leaves)
          .enter()
          .append("text")
          .attr("class", (d: any) => `node ${d.data.season === currentSeason ? "active" : ""}`)
          .attr("transform", (d: any) => `rotate(${d.x - 90})translate(${d.y + 20})${d.x < 180 ? "" : "rotate(180)"}`)
          .attr("text-anchor", (d: any) => (d.x < 180 ? "start" : "end"))
          .text((d: any) => d.data.id)
          .style("cursor", "pointer")
          // Mobile adjustments: font size
          .style("font-size", isMobile ? "9px" : "11px")
          .on("mouseover", (event, d: any) => {
            if (d.data.season !== currentSeason) return;
            onNodeHover(d.data.id);
          })
          .on("click", (event, d: any) => {
              if (d.data.season !== currentSeason) return;
              onNodeClick(d.data.id);
          });

          // Expose link selection for updates
          (chartRef.current as any).__linkSelection = linkSelection;
    };

    drawChart();

    // Add Resize Listener
    window.addEventListener('resize', drawChart);

    return () => {
        window.removeEventListener('resize', drawChart);
    };

  }, [currentSeason, recipes, nodes]); // Re-run if season or data changes

  // Update active state without full redraw
  useEffect(() => {
    if (!chartRef.current) return;
    const linkSelection = (chartRef.current as any).__linkSelection;
    
    if (linkSelection) {
        linkSelection.classed("active", (l: any) => 
            activeNodeId ? l.recipe.ids.includes(activeNodeId) : false
        );
    }
  }, [activeNodeId]);

  return (
    <div id="chart" ref={chartRef} className="flex-1 relative bg-black overflow-hidden h-[50vh] md:h-full w-full">
      {/* SVG appended by D3 */}
    </div>
  );
};
