export const ThemeSettings = (mode) => {
    return {
        palette: {
            mode: mode,
            ...(mode === "dark"
                ? {
                    // palette values for dark mode
                    primary: {
                        "main": "#1A2928"
                    },
                    secondary: {
                        "main": "#000000"
                    },
                    background: {
                        "default": "#1A2928",
                        "main": "#000000",
                        "xff": "#07100F"
                    },
                    Text: {
                        "main": "#FFFFFF",
                        "other": "#04FF60",
                        "Title": "#00FFFF",
                        "Sdd": "#F8F8F8",

                    },
                    support: {
                        "scroll": "#0F6060",
                        "scrollBar": "#292929",
                        "container": "#333333",
                        "cover": "#292929",
                        "Reject": "#FC1414",
                        "shade": "#0E2423",
                        "save": "#0BA500",
                        "edit": "#A5A500"
                    },
                    "color": {
                        "main": "#00FFFF",
                        "container": "#000000"
                    }
                }
                : {
                    // palette values for dark mode
                    primary: {
                        "main": "#CEF0DD"
                    },
                    secondary: {
                        "main": "#375D60"
                    },
                    background: {
                        "default": "#CEF0DD",
                        "main": "#375D60",
                        "xff": "#0E1C1D"
                    },
                    Text: {
                        "main": "#FFFFFF",
                        "other": "#00FFCB",
                        "Title": "#C500FF",
                        "Sdd": "#000000",
                    },
                    support: {
                        "scroll": "#0F6060",
                        "scrollBar": "#E2E2E2",
                        "cover": "#006042",
                        "container": "#EBF8F1",
                        "Reject": "#C20000",
                        "shade": "#E1FCED",
                        "save": "#0BA500",
                        "edit": "#A5A500"
                    },
                    "color": {
                        "main": "#C500FF",
                        "container": "#EBF8F1"
                    }
                }),
        },
        typography: {
            fontFamily: ["Inter", "sans-serif"].join(","),
            fontSize: 12,
            h1: {
                fontFamily: ["Inter", "sans-serif"].join(","),
                fontSize: 40,
            },
            h2: {
                fontFamily: ["Inter", "sans-serif"].join(","),
                fontSize: 32,
            },
            h3: {
                fontFamily: ["Inter", "sans-serif"].join(","),
                fontSize: 24,
            },
            h4: {
                fontFamily: ["Inter", "sans-serif"].join(","),
                fontSize: 20,
            },
            h5: {
                fontFamily: ["Inter", "sans-serif"].join(","),
                fontSize: 16,
            },
            h6: {
                fontFamily: ["Inter", "sans-serif"].join(","),
                fontSize: 14,
            },
        },
    };
};