import React from 'react';

export const GlobalStyles: React.FC = () => {
  return (
    <style dangerouslySetInnerHTML={{ __html: `
      :root {
        --bg: #050505;
        --gold: #ffffff;
        --gold-bright: #ffffff;
        --gold-dim: rgba(212, 175, 55, 0.15);
        --glass: rgba(15, 15, 15, 0.85);
        --border: rgba(212, 175, 55, 0.2);
        --accent-sp: #ffb7c5;
        --accent-su: #00bfff;
        --accent-au: #d2691e;
        --accent-wi: #e0ffff;
        --active-color: var(--gold);
        --error: #ff4d4d;
      }

      body {
        background: var(--bg);
        color: #e0e0e0;
        font-family: "Inter", sans-serif;
        margin: 0;
        overflow: hidden;
        height: 100vh;
        user-select: none;
      }

      /* Custom Scrollbar */
      ::-webkit-scrollbar { width: 4px; }
      ::-webkit-scrollbar-track { background: transparent; }
      ::-webkit-scrollbar-thumb { background: var(--border); border-radius: 10px; }

      /* Animations */
      @keyframes slideIn {
        from { opacity: 0; transform: translateX(-10px); }
        to { opacity: 1; transform: translateX(0); }
      }

      /* Auth Overlay Styles */
      .auth-overlay {
        position: fixed;
        inset: 0;
        background: radial-gradient(circle at center, #1a1a1a 0%, #000 100%);
        z-index: 10000;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: 1.5s cubic-bezier(0.19, 1, 0.22, 1);
      }
      .auth-card {
        background: var(--glass);
        border: 1px solid var(--border);
        padding: 60px;
        text-align: center;
        box-shadow: 0 0 100px rgba(0, 0, 0, 0.8), 0 0 40px var(--gold-dim);
      }
      .auth-input {
        background: transparent;
        border: none;
        border-bottom: 1px solid #333;
        color: var(--gold);
        padding: 15px;
        width: 100%;
        text-align: center;
        font-family: "Space Grotesk";
        letter-spacing: 8px;
        outline: none;
      }

      /* Layout Styles */
      .wrapper {
        display: flex;
        height: 100vh;
        transition: 2s ease;
        filter: blur(20px);
        opacity: 0;
      }
      .wrapper.unlocked {
        filter: blur(0);
        opacity: 1;
      }

      /* Sidebar Specifics */
      .sidebar-glass {
        background: var(--glass);
        backdrop-filter: blur(50px);
        border-right: 1px solid var(--border);
      }

      /* Buttons & Inputs */
      .btn-custom {
        background: rgba(255, 255, 255, 0.03);
        border: 1px solid var(--border);
        color: #888;
        font-family: "Space Grotesk";
        transition: 0.3s;
      }
      .btn-custom:hover {
        border-color: var(--gold);
        color: #fff;
      }
      .btn-custom.active {
        background: var(--gold-dim);
        color: #fff;
        border-color: var(--gold);
        box-shadow: 0 0 15px var(--gold-dim);
      }
      
      /* Range Input Customization */
      input[type="range"] {
        -webkit-appearance: none;
        width: 100%;
        background: transparent;
      }
      input[type="range"]::-webkit-slider-runnable-track {
        width: 100%;
        height: 2px;
        background: var(--border);
      }
      input[type="range"]::-webkit-slider-thumb {
        -webkit-appearance: none;
        height: 12px;
        width: 12px;
        border-radius: 50%;
        background: var(--gold);
        cursor: pointer;
        margin-top: -5px;
      }

      /* D3 Chart Specifics */
      .node {
        font-family: "Space Grotesk";
        font-size: 11px;
        fill: #444;
        transition: 0.3s;
        cursor: pointer;
      }
      .node.active {
        fill: #fff;
        font-weight: bold;
        font-size: 13px;
      }
      .link {
        fill: none;
        stroke: var(--active-color);
        stroke-opacity: 0.05;
        transition: 0.5s;
      }
      .link.active {
        stroke-opacity: 0.7;
        stroke-width: 1.5px;
        filter: drop-shadow(0 0 5px var(--active-color));
      }

      /* Perf Card Animation */
      .perf-card {
        animation: slideIn 0.4s ease forwards;
      }
    `}} />
  );
};
