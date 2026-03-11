import { Row, ColumnDef } from "@tanstack/react-table";

interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps {
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  className?: string;
  disabled?: boolean;
}

export interface DatePickerProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
  error?: boolean;
  className?: string;
}

export interface TableProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
  rowSelection?: Record<string, boolean>;
  setRowSelection?: (updater: any) => void;
  isLoading?: boolean;
  showPagination?: boolean;
  showFilter?: boolean;
  getRowId?: (row: T) => string;
  pageSize?: number;
}

export interface TableRowProps<T> {
  row: Row<T>;
  isSelected: boolean;
}

export interface GlobalData {
  user?: string;
  modfor?: string;
  codfor?: string;
  nrofor?: string;
}

export interface GlobalParameters extends GlobalData {
  loading: boolean;
}

export interface GlobalContextProps extends GlobalParameters {
  globalData: GlobalData;
  setGlobalData: React.Dispatch<React.SetStateAction<GlobalData>>;
}

export interface TitleProps {
  text: string;
  subtitle?: string;
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  variant?:
    | "primary"
    | "secondary"
    | "action"
    | "success"
    | "warning"
    | "danger"
    | "ghost"
    | "dark";
  isLoading?: boolean;
  className?: string;
}

interface ButtonOps {
  id: string | number;
  label: string;
  href?: string;
  icon?: React.ReactNode;
  count?: number;
}

export interface ButtonGroupProps {
  tabs: ButtonOps[];
  activeTab: string | number;
  onChange: (id: any) => void;
  className?: string;
  variant?: "default" | "compact";
}

export interface TimelineStep {
  label: string;
  description?: string;
  isCompleted: boolean;
  isCurrent: boolean;
}
