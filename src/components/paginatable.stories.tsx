import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { fn } from "storybook/test";
import { default as Paginatable } from "./paginatable.component";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
	title: "Example/Pagination",
	component: Paginatable,
	parameters: {
		// Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
		layout: "centered",
	},
	// This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
	tags: ["tables"],
	// More on argTypes: https://storybook.js.org/docs/api/argtypes
	argTypes: {
		pageSize: {
			label: "Page Size",
			control: "number",
			type: "number",
			description: "Total Number of records to show per page",
		},
		pageNumber: {
			label: "Page Number",
			control: "number",
			type: "number",
			description:
				"Currently selected and visibile index within paginting between results",
		},
		totalPages: {
			label: "Total Pages",
			control: "number",
			type: "number",
			description:
				"Text to display total number of pages that are possible to look between",
		},
		title: {
			label: "Title",
			control: "text",
			description:
				"The title of the overall component taht is being looked at",
		},
		children: {
			label: "Child Component",
			description: "Child component to render with pagination",
		},
	},
	// Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
	args: {
		onPage: fn(),
	},
} satisfies Meta<typeof Paginatable>;

export default meta;

type Story = StoryObj<typeof meta>;

const SampleTable = () => (
	<table>
		<thead>
			<tr>
				<th>Column 1</th>
				<th>Column 2</th>
				<th>Column 3</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td>[0,0]</td>
				<td>[0,1]</td>
				<td>[0,2]</td>
			</tr>
			<tr>
				<td>[1,0]</td>
				<td>[1,1]</td>
				<td>[1,2]</td>
			</tr>
			<tr>
				<td>[2,0]</td>
				<td>[2,1]</td>
				<td>[2,2]</td>
			</tr>
		</tbody>
	</table>
);

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
	args: {
		title: "Primary Example",
		totalPages: 30,
		children: <SampleTable />,
	},
};
