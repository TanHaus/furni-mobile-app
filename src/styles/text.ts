export const FontFamily = {
	Regular: "Roboto",
	Semibold: "Roboto Semibold",
	Bold: "Roboto Bold",
	Light: "Roboto Light"
};

export const FontSize = {
	XSmall: {
		size: 12,
		lineHeight: 14.4
	},
	Small: {
		size: 14,
		lineHeight: 16.8
	},
	Regular: {
		size: 16,
		lineHeight: 19.2
	},
	Large: {
		size: 20,
		lineHeight: 24
	},
	XLarge: {
		size: 28,
		lineHeight: 33.6
	}
};

export enum TextStyleType {
	XSmall = "XSmall",    // T&C, Superscript
	Small = "Small",      // Labels, Description, Ratings
	Regular = "Regular",  // Regular Text, Hints
	Large = "Large",      // CTAs, Price
	XLarge = "XLarge"     // Titles, Banner
}
