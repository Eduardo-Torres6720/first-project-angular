export interface IDialogDataBin {
  tasks: {
    title: string;
    description: string;
    completed: boolean;
    id: string;
    active: boolean;
  }[];
}
