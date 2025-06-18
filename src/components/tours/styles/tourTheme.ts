// /src/components/tours/styles/tourTheme.ts
export const tourTheme = {
  // Color palette
  colors: {
    primary: {
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      main: "#667eea",
      dark: "#764ba2"
    },
    secondary: {
      tropical: "#00bcd4",
      sunset: "#ff9800",
      ocean: "#2196f3"
    },
    status: {
      featured: "#ff9800",
      vip: "#9c27b0", 
      pinned: "#2196f3",
      homepage: "#4caf50",
      unforgettable: "#f44336"
    },
    // FIX: Added an index signature to allow TypeScript to safely access categories by a string variable.
    categories: {
      "Hiking": "#4caf50",
      "Snorkel": "#00bcd4", 
      "Kayak": "#03a9f4",
      "Sunset Cruise": "#ff9800",
      "Wildlife": "#8bc34a",
      "Scenic": "#9c27b0",
      "Adventure": "#f44336",
      "Other": "#607d8b"
    } as { [key: string]: string }, // This assertion fixes the indexing errors
    neutral: {
      background: "#fafafa",
      card: "#ffffff",
      border: "#e0e0e0",
      text: {
        primary: "#1a1a1a",
        secondary: "#666666",
        light: "#999999"
      }
    }
  },
    
    // Spacing system (8px grid)
    spacing: {
      xs: "4px",
      sm: "8px", 
      md: "16px",
      lg: "24px",
      xl: "32px",
      xxl: "48px"
    },
    
    // Border radius
    borderRadius: {
      sm: "4px",
      md: "8px", 
      lg: "12px",
      xl: "16px"
    },
    
    // Shadows
    shadows: {
      card: "0 2px 8px rgba(0,0,0,0.1)",
      hover: "0 4px 12px rgba(0,0,0,0.15)",
      focus: "0 0 0 3px rgba(102, 126, 234, 0.2)"
    },
    
    // Typography
    typography: {
      heading: {
        fontSize: "1.5rem",
        fontWeight: 700,
        lineHeight: 1.3
      },
      subheading: {
        fontSize: "1rem", 
        fontWeight: 600,
        lineHeight: 1.4
      },
      body: {
        fontSize: "0.875rem",
        fontWeight: 400,
        lineHeight: 1.5
      },
      caption: {
        fontSize: "0.75rem",
        fontWeight: 400,
        lineHeight: 1.4
      }
    }
  };