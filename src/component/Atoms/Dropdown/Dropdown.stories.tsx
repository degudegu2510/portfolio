import { useRef, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Dropdown } from "./Dropdown";
import { DropdownButton } from "./DropdownButton";
import { DropdownList } from "./DropdownList";

const meta: Meta<typeof Dropdown> = {
  title: "Atoms/Dropdown",
  component: Dropdown,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    role: {
      control: "text",
      description: "WAI-ARIA role（デフォルト: listbox）",
    },
    id: {
      control: "text",
      description: "ドロップダウンの一意な ID",
    },
    ariaLabel: {
      control: "text",
      description: "アクセシビリティ用ラベル",
    },
    className: {
      control: "text",
      description: "追加の CSS クラス",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const items = ["Option A", "Option B", "Option C"];

export const Default: Story = {
  render: () => {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState("Option A");

    return (
      <div className="relative">
        <DropdownButton
          ref={buttonRef}
          className="flex items-center gap-2 px-4 py-2 rounded-sm bg-surface hover:bg-surface-variant transition cursor-pointer"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-controls="dropdown-default"
        >
          {selected}
        </DropdownButton>
        {isOpen && (
          <Dropdown
            id="dropdown-default"
            className="absolute left-0 top-full mt-1 p-1 rounded-lg bg-surface elevation-1 w-[max-content] z-10"
            buttonRef={buttonRef}
            closeHandler={() => setIsOpen(false)}
            ariaLabel="オプション選択"
          >
            {items.map((item) => (
              <DropdownList key={item}>
                <button
                  className="flex w-full px-4 py-2 text-left rounded-sm hover:bg-surface-variant cursor-pointer"
                  onClick={() => {
                    setSelected(item);
                    setIsOpen(false);
                    buttonRef.current?.focus();
                  }}
                  tabIndex={0}
                >
                  {item}
                </button>
              </DropdownList>
            ))}
          </Dropdown>
        )}
      </div>
    );
  },
};

export const WithManyItems: Story = {
  render: () => {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState("Item 1");
    const manyItems = Array.from({ length: 8 }, (_, i) => `Item ${i + 1}`);

    return (
      <div className="relative inline-block">
        <DropdownButton
          ref={buttonRef}
          className="flex items-center gap-2 px-4 py-2 rounded-sm bg-surface hover:bg-surface-variant transition cursor-pointer"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-controls="dropdown-many"
        >
          {selected}
        </DropdownButton>
        {isOpen && (
          <Dropdown
            id="dropdown-many"
            className="absolute left-0 top-full mt-1 p-1 rounded-lg bg-surface elevation-1 w-[max-content] max-h-48 overflow-y-auto z-10"
            buttonRef={buttonRef}
            closeHandler={() => setIsOpen(false)}
            ariaLabel="アイテム選択"
          >
            {manyItems.map((item) => (
              <DropdownList key={item}>
                <button
                  className="flex w-full px-4 py-2 text-left rounded-sm hover:bg-surface-variant cursor-pointer"
                  onClick={() => {
                    setSelected(item);
                    setIsOpen(false);
                    buttonRef.current?.focus();
                  }}
                  tabIndex={0}
                >
                  {item}
                </button>
              </DropdownList>
            ))}
          </Dropdown>
        )}
      </div>
    );
  },
};

export const MenuRole: Story = {
  render: () => {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [isOpen, setIsOpen] = useState(false);
    const menuItems = ["編集", "複製", "削除"];

    return (
      <div className="relative">
        <DropdownButton
          ref={buttonRef}
          className="flex items-center gap-2 px-4 py-2 rounded-sm bg-surface hover:bg-surface-variant transition cursor-pointer"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-haspopup="menu"
          aria-expanded={isOpen}
          aria-controls="dropdown-menu"
        >
          メニュー
        </DropdownButton>
        {isOpen && (
          <Dropdown
            id="dropdown-menu"
            className="absolute left-0 top-full mt-1 p-1 rounded-lg bg-surface elevation-1 w-[max-content] z-10"
            buttonRef={buttonRef}
            closeHandler={() => setIsOpen(false)}
            role="menu"
            ariaLabel="アクションメニュー"
          >
            {menuItems.map((item) => (
              <DropdownList key={item} role="menuitem">
                <button
                  className="flex w-full px-4 py-2 text-left rounded-sm hover:bg-surface-variant cursor-pointer"
                  onClick={() => {
                    setIsOpen(false);
                    buttonRef.current?.focus();
                  }}
                  tabIndex={0}
                >
                  {item}
                </button>
              </DropdownList>
            ))}
          </Dropdown>
        )}
      </div>
    );
  },
};
