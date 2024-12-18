import SelectLabel from "../components/commons/SelectLabel";

export default {
    title: "Components/SelectLabel",
    component: SelectLabel,
    parameters: {
        layout: "centered",
    },
    argTypes: {
        label: { control: "text" },
    },
};

export const Default = {
    args: {
        label: "크기",
    },
};
