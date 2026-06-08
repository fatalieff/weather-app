import React from "react";
import styled from "styled-components";

const Input = ({ setCity, setLoading }) => {
  return (
    <StyledWrapper>
      <div className="input-container">
        <input
          type="text"
          required
          id="input"
          autoComplete="off"
          onChange={(e) => {
            if (e.target.value.trim() === "") {
              setCity("");
            } else {
              setLoading(true);
              setCity(e.target.value);
              setLoading(false);
            }
          }}
        />
        <label htmlFor="input" className="label poppins">
          Search city...
        </label>
        <div className="underline" />
        <div className="focus-glow" />
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .input-container {
    position: relative;
    margin: 8px 0 16px;
    width: 100%;
    border-radius: 12px;
    transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  .input-container:focus-within {
    transform: translateY(-2px);
  }

  .input-container input[type="text"] {
    position: relative;
    z-index: 2;
    font-size: 18px;
    font-family: "Poppins", sans-serif;
    width: 100%;
    border: none;
    border-bottom: 2px solid rgba(255, 255, 255, 0.2);
    padding: 10px 0;
    background: transparent;
    background-color: transparent;
    outline: none;
    color: #fff;
    caret-color: #7dd3fc;
    box-shadow: none;
    -webkit-appearance: none;
    appearance: none;
    transition: border-color 0.35s ease, color 0.3s ease;
  }

  .input-container input[type="text"]:focus {
    background: transparent;
    background-color: transparent;
    border-bottom-color: transparent;
    box-shadow: none;
    outline: none;
  }

  .input-container input[type="text"]:-webkit-autofill,
  .input-container input[type="text"]:-webkit-autofill:hover,
  .input-container input[type="text"]:-webkit-autofill:focus,
  .input-container input[type="text"]:-webkit-autofill:active {
    -webkit-box-shadow: 0 0 0 1000px transparent inset !important;
    box-shadow: 0 0 0 1000px transparent inset !important;
    -webkit-text-fill-color: #fff !important;
    background-color: transparent !important;
    transition: background-color 9999s ease-out 0s;
  }

  .input-container .label {
    position: absolute;
    top: 10px;
    left: 0;
    z-index: 3;
    color: rgba(255, 255, 255, 0.45);
    font-size: 18px;
    transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
    pointer-events: none;
  }

  .input-container input[type="text"]:focus ~ .label,
  .input-container input[type="text"]:valid ~ .label {
    top: -20px;
    font-size: 12px;
    color: #7dd3fc;
    letter-spacing: 1px;
    text-transform: uppercase;
  }

  .input-container .underline {
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 2;
    height: 2px;
    width: 100%;
    background: linear-gradient(90deg, #38bdf8, #818cf8, #c084fc);
    background-size: 200% 100%;
    transform: scaleX(0);
    transform-origin: left;
    border-radius: 2px;
    opacity: 0;
    transition: transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.3s ease;
  }

  .input-container input[type="text"]:focus ~ .underline,
  .input-container input[type="text"]:valid ~ .underline {
    transform: scaleX(1);
    opacity: 1;
    animation: shimmer 2s linear infinite;
  }

  .input-container .focus-glow {
    position: absolute;
    inset: -8px -4px -4px;
    z-index: 1;
    border-radius: 14px;
    background: radial-gradient(
      ellipse at 50% 100%,
      rgba(56, 189, 248, 0.18) 0%,
      transparent 70%
    );
    opacity: 0;
    transform: scaleY(0.6);
    transition: opacity 0.4s ease, transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
    pointer-events: none;
  }

  .input-container:focus-within .focus-glow {
    opacity: 1;
    transform: scaleY(1);
    animation: glowPulse 2s ease-in-out infinite;
  }

  @keyframes shimmer {
    0% {
      background-position: 200% 0;
    }
    100% {
      background-position: -200% 0;
    }
  }

  @keyframes glowPulse {
    0%,
    100% {
      opacity: 0.7;
    }
    50% {
      opacity: 1;
    }
  }
`;

export default Input;
