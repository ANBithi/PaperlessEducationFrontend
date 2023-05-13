import {
	extendTheme,
	theme as base,
	withDefaultColorScheme,
	withDefaultSize,
	withDefaultVariant,
} from "@chakra-ui/react";

// 2. Add your color mode config
// const config = {
//   initialColorMode: 'dark',
//   useSystemColorMode: false,

// }

const onSurfaceStyle = {
	".chakra-ui-light &": {
		bg: "background.100",

	},
	".chakra-ui-dark &": {
		bg: "backgroundDark.100",
	},
};

const onSecondarySurfaceStyle = {
	".chakra-ui-light &": {
		bg: "background.200",
	},
	".chakra-ui-dark &": {
		bg: "backgroundDark.200",
	},
};
const hoverStyle = {
	".chakra-ui-light &": {
		_hover:{ 
		 cursor: "pointer",
		 backgroundColor: "primary.200" },
	},
	".chakra-ui-dark &": {
		_hover:{ 
		 cursor: "pointer",
		 backgroundColor: "primary.800" },
	},

}

const surfaceStyle = {
	".chakra-ui-light &": {
		bg: "background.50",
		color: "backgroundDark.200",
	},
	".chakra-ui-dark &": {
		bg: "backgroundDark.50",
		color: "background.200",
	}
}

const Input = {
	baseStyle: {
		field: {
			...onSecondarySurfaceStyle,
		}
	},
	variants: {
		outline: {
			field: {
				_hover: {
					borderColor: "primary.400",
				},
				borderColor: "primary.300",
				_focus: {
					borderColor: "primary.500",
					boxShadow: "none",
				},
			},
		},
	},
	sizes: {
		sm: {
			field: {
					//
			}
		},
	},
	defaultProps: {},
};


const Select = {
	baseStyle: {
		field: {
			
		}
	},
	variants: {
		outline: {
		  field: {
			_hover: {
				borderColor: 'primary.400',
			  },
			borderColor : "primary.300",
			_focus: {
			  borderColor: 'primary.500',
			  boxShadow: 'none',
			},
		  },
		},
	},
	sizes: {},
	defaultProps: {},
}

const Modal = {
	baseStyle: {
		overlay: {
			//bg: 'red.200', //change the background
		  },
		  dialog: {
			...onSurfaceStyle
		  },
	},
	
}

const Drawer = {
	baseStyle: {
		overlay: {
			//bg: 'red.200', //change the background
		  },
		  dialog: {
			...onSurfaceStyle
		  },
	},
	
}

const Popover = {
	 baseStyle: {
        content: {
          ...onSecondarySurfaceStyle,
          },
        },
      }

const theme = extendTheme(
	{
		layerStyles: {
			gridItemStyle: {
				fontSize: "14px",
				p: "3%",
				bg: "transparent",
				border: "1px solid",
				borderColor: "primary.300",
				borderRadius: "2px",
				".chakra-ui-light &": {
					color: "primary.900",
					_hover: { bg: "primary.100" },
				},
				".chakra-ui-dark &": {
					color: "primary.100",
					_hover: { bg: "primary.700" },
				},
			},
			themeIconStyle: {
				".chakra-ui-light &": {
					bg: "transparent",
					color: "primary.900",
					_hover: { bg: "primary.100" },
				},
				".chakra-ui-dark &": {
					bg: "transparent",
					color: "primary.100",
					_hover: { bg: "primary.700" },
				},
			},
			InputAddOns: {
				w: "50px",
				h: "50px",
				border: "1px solid",
				...onSecondarySurfaceStyle,
				...hoverStyle
			},
			navbarStyle: {
				w: "100%",
				px: "6",
				py: "5",				
				pos: "relative",
				zIndex: "12",
				...onSurfaceStyle
			},
			sectionHeaderStyle: {
				fontSize: "16px",
				fontWeight: "Bold",
			},
			sectionStyle: {
				w: "50%",
				fontSize: "14px",
				pb: "1%",
			},
			responseBubbleStyle: {
				padding: "12px",
				rounded: "20px",
				minW: "65%",
				...onSecondarySurfaceStyle
			},
			responseContentStyle: {
				fontSize: "16px",
			},
			responseItemFooterStyle: {
				w: "full",
				fontSize: "14px",
				paddingLeft: "12px",
				...onSurfaceStyle
			},
			responseTextareaStyle: {
				paddingLeft: "8px",
				paddingRight: "8px",
				w: "full",
				size: "sm",
				resize: "none",
			},
			postViewerStyle: {
				width: "full",
				boxShadow: "md",
				alignSelf: "flex-end",
				rounded: "16px",
				...onSurfaceStyle
			},
			courseActivityStyle: {
				width: "20%",
				spacing: "12px",
				marginRight: "12px",
				padding: "16px",
				boxShadow: "md",
				alignSelf: "start",
				rounded: "16px",
				height: "100%",
				...onSurfaceStyle
			},
			createPostStyle: {
				w: "full",
				alignSelf: "flex-end",
				boxShadow: "md",
				rounded: "16px",
				padding: "20px",
				marginTop: "32px",
				...onSurfaceStyle
			},
			notificationListStyle: {
				width: "300px",
				height: "80vh",
				boxShadow: "md",
				padding: "16px",
				rounded: "8px",
				overflow : "auto",
				...onSurfaceStyle
			},
			notificationCardStyle: {
				rounded:"8px",
				_hover:{ cursor: "pointer" },		
            fontSize:"14px",
            padding:'8px',
            marginTop:'12px',
			...onSecondarySurfaceStyle
			},

			responseAuthorStyle: {
				fontSize: "12px",
				fontWeight: "bold",
			},
			pageStyle: {
				height: "calc(100% - 80px)",
				overflow: "auto",
				p: "2%",
				width: "100%",
				...surfaceStyle,
			},

			noNavPageStyle: {
				height: "100%",
				overflow: "auto",
				p: "16px",
				width: "100%",
				...surfaceStyle,
			},


			examMetadataStyle : {
				boxShadow :"md",
				  p :"12px",
				rounded :"8px",
				 w : "360px",
				 ".chakra-ui-light &": {
					bg: "background.200",
				},
				".chakra-ui-dark &": {
					bg: "backgroundDark.200",
				},
			},

			pageStyleSidePanel: {
				height: "calc(100% - 80px)",
				width: "100%",
				...surfaceStyle			
			},

			onSurfaceStyle: {...onSurfaceStyle},
			onSecondarySurfaceStyle: {...onSecondarySurfaceStyle},
			hoverStyle : {...hoverStyle},
			pageButtonStyle: {
				pt: "2%",
				pb: "2%",
			},
			inputStackStyle: {
				w: "full",
				pb: ".5%",				
				padding: "12px",
				rounded: "8px",
				boxShadow: "md",
				...onSecondarySurfaceStyle
			},
			inputLabelStyle : {
				width : "40%",
				fontWeight : "bold",
				fontSize : "14px",
			},
			inputStyle: {
				w: "70%",
				
			},

			courseCardStyle : {
				w:"350px",
				 boxShadow:"md",
				  rounded:"12px",
				  ...onSurfaceStyle
			},
		},
		textStyles: {
			buttonTextStyle: {
				// you can also use responsive styles
				fontSize: ["16px", "28px"],
			},
			smallAndBoldStyle: {
				fontSize: "12px",
				fontWeight: "bold",
			},
		},
		styles: {
			global: {
				body: {},
			},
		},
		colors: {
			primary: {
				50: "#ecf2fb",
				100: "#ced7e3",
				200: "#afbdce",
				300: "#90a2bb",
				400: "#7088a7",
				500: "#576e8e",
				600: "#43566f",
				700: "#303d50",
				800: "#1c2531",
				900: "#050c15",
			},
			background: {
				50: "#eaeaea",
				100: "#e1e1e1",
				200: "#d8d8d8",
			},
			backgroundDark: {
				50: "#1b1b1b",
				100: "#272727",
				200: "#373737",
			},
		},
		fonts: {
			heading: `Poppins, ${base.fonts?.heading}`,
			body: `Poppins, ${base.fonts?.body}`,
		},

		components: {
			Input: Input,
			Select: Select,
			Modal : Modal,
			Popover: Popover,
			Drawer: Drawer
		},
	},
	withDefaultColorScheme({
		colorScheme: "blue",
	}),
	withDefaultVariant({
		variant: "outline",
		components: ["Input"],
	}),
	withDefaultSize({
		size: "sm",
		components: ["Input", "Select"],
	})
);

export default theme;
