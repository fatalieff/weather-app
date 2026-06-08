import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import axios from "axios";

const API_KEY = "4d8fb5b93d4af21d66a2948710284366";

const formatSuggestion = (item) => {
  const parts = [item.name];
  if (item.state) parts.push(item.state);
  parts.push(item.country);
  return parts.join(", ");
};

const Input = ({ onCitySelect, onClear }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setIsOpen(false);
        setActiveIndex(-1);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const trimmed = query.trim();
    if (trimmed.length < 2) {
      setSuggestions([]);
      setIsOpen(false);
      return;
    }

    const timer = setTimeout(async () => {
      setLoadingSuggestions(true);
      try {
        const { data } = await axios.get(
          `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(trimmed)}&limit=6&appid=${API_KEY}`
        );
        setSuggestions(data);
        setIsOpen(data.length > 0);
        setActiveIndex(-1);
      } catch {
        setSuggestions([]);
        setIsOpen(false);
      } finally {
        setLoadingSuggestions(false);
      }
    }, 350);

    return () => clearTimeout(timer);
  }, [query]);

  const selectCity = (item) => {
    const label = formatSuggestion(item);
    const cityQuery = `${item.name},${item.country}`;
    setQuery(label);
    setSuggestions([]);
    setIsOpen(false);
    setActiveIndex(-1);
    onCitySelect(cityQuery);
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    if (value.trim() === "") {
      setSuggestions([]);
      setIsOpen(false);
      onClear();
    }
  };

  const handleKeyDown = (e) => {
    if (!isOpen || suggestions.length === 0) {
      if (e.key === "Enter" && query.trim()) {
        onCitySelect(query.trim());
        setIsOpen(false);
      }
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) => (prev > 0 ? prev - 1 : suggestions.length - 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const selected = suggestions[activeIndex] ?? suggestions[0];
      if (selected) selectCity(selected);
    } else if (e.key === "Escape") {
      setIsOpen(false);
      setActiveIndex(-1);
    }
  };

  const hasValue = query.length > 0;

  return (
    <StyledWrapper ref={wrapperRef}>
      <div className={`input-container${hasValue ? " has-value" : ""}`}>
        <input
          type="text"
          id="input"
          autoComplete="off"
          value={query}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onFocus={() => suggestions.length > 0 && setIsOpen(true)}
        />
        <label htmlFor="input" className="label poppins">
          Search city...
        </label>
        <div className="underline" />
        <div className="focus-glow" />

        {loadingSuggestions && (
          <span className="search-spinner" aria-hidden="true" />
        )}
      </div>

      {isOpen && suggestions.length > 0 && (
        <ul className="suggestions poppins" role="listbox">
          {suggestions.map((item, index) => (
            <li
              key={`${item.name}-${item.country}-${item.lat}`}
              role="option"
              aria-selected={index === activeIndex}
              className={index === activeIndex ? "active" : ""}
              onMouseEnter={() => setActiveIndex(index)}
              onMouseDown={(e) => {
                e.preventDefault();
                selectCity(item);
              }}
            >
              <span className="city-name">{item.name}</span>
              <span className="city-meta">
                {[item.state, item.country].filter(Boolean).join(", ")}
              </span>
            </li>
          ))}
        </ul>
      )}
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  position: relative;
  width: 100%;

  .input-container {
    position: relative;
    margin: 8px 0 4px;
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
    padding: 10px 28px 10px 0;
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

  .input-container:focus-within .label,
  .input-container.has-value .label {
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

  .input-container:focus-within .underline,
  .input-container.has-value .underline {
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

  .search-spinner {
    position: absolute;
    right: 4px;
    top: 50%;
    transform: translateY(-50%);
    z-index: 4;
    width: 16px;
    height: 16px;
    border: 2px solid rgba(255, 255, 255, 0.2);
    border-top-color: #7dd3fc;
    border-radius: 50%;
    animation: spin 0.7s linear infinite;
  }

  .suggestions {
    position: absolute;
    top: calc(100% + 6px);
    left: 0;
    right: 0;
    z-index: 20;
    list-style: none;
    margin: 0;
    padding: 6px;
    background: rgba(15, 23, 42, 0.75);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border: 1px solid rgba(255, 255, 255, 0.15);
    border-radius: 14px;
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.35);
    max-height: 240px;
    overflow-y: auto;
    animation: dropIn 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  .suggestions li {
    display: flex;
    flex-direction: column;
    gap: 2px;
    padding: 10px 14px;
    border-radius: 10px;
    cursor: pointer;
    transition: background 0.2s ease, transform 0.15s ease;
  }

  .suggestions li:hover,
  .suggestions li.active {
    background: rgba(56, 189, 248, 0.15);
    transform: translateX(3px);
  }

  .suggestions .city-name {
    font-size: 15px;
    font-weight: 500;
    color: #fff;
  }

  .suggestions .city-meta {
    font-size: 12px;
    color: rgba(255, 255, 255, 0.5);
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

  @keyframes spin {
    to {
      transform: translateY(-50%) rotate(360deg);
    }
  }

  @keyframes dropIn {
    from {
      opacity: 0;
      transform: translateY(-8px) scale(0.97);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }
`;

export default Input;
