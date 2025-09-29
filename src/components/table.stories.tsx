import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { fn } from "storybook/test";
import { default as Table } from "./table.component";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
	title: "Example/Tables",
	component: Table,
	parameters: {
		// Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
		layout: "centered",
	},
	// This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
	tags: ["tables"],
	// More on argTypes: https://storybook.js.org/docs/api/argtypes
	argTypes: {
		headers: [],
		data: [],
		onSort: (key: string) =>
			console.log("Story book table sort key clicked", key),
	},
	// Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
	args: {
		onSort: fn(),
	},
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
	args: {
		headers: [
			{
				fieldKey: "firstName",
				text: "First Name",
				orderable: false,
				sortable: false,
			},
			{
				fieldKey: "lastName",
				text: "Last Name",
				orderable: false,
				sortable: false,
			},
		],
		data: [
			{
				firstName: "Pirate",
				lastName: "Steve",
			},
			{
				firstName: "Micheal",
				lastName: "Johnson",
			},
		],
	},
};

const data = [
	{
		firstName: "Pirate",
		lastName: "Steve",
		fullName: () => "Pirate Steve",
	},
	{
		firstName: "Micheal",
		lastName: "Johnson",
		fullName: () => "Michael Johnson",
	},
];

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const UsingDisplayFunction: Story = {
	args: {
		headers: [
			{
				fieldKey: "firstName",
				text: "First Name",
				orderable: false,
				sortable: false,
			},
			{
				fieldKey: "lastName",
				text: "Last Name",
				orderable: false,
				sortable: false,
			},
			{
				fieldKey: "fullName",
				text: "Full Name",
				orderable: false,
				sortable: false,
			},
		],
		data,
	},
};
