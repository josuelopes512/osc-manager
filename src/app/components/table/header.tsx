"use client";

import { Button, Tooltip } from "@nextui-org/react";
import { usePathname, useRouter } from "next/navigation";
import { FaArrowLeft, FaPlus } from "react-icons/fa";
import { ColumnProps } from "@/components/table/types";

interface HeaderTableProps<TData extends Record<string, any>> {
  path: string;
  defaultText?: string;
  newText?: string;
  filterColumns?: ColumnProps<TData>[];
  pathNew?: string;
}

const HeaderTable = <TData extends Record<string, any>>({
  newText,
  path,
  defaultText,
}: HeaderTableProps<TData>) => {
  const pathname = usePathname();
  const lists = pathname === "/" + path;
  const router = useRouter();

  return (
    <div className="flex justify-between gap-5">
      <div className="flex w-full justify-end gap-5">
        {lists && (
          <>
            <Tooltip
              content={`${newText || `New ${defaultText}`}`}
              placement="bottom-end"
              className="text-white"
              color="primary"
            >
              <Button
                isIconOnly
                color="default"
                className="rounded-full text-white"
                onClick={() => router.push(`/${path}/new`)}
              >
                <FaPlus size={20} />
              </Button>
            </Tooltip>
          </>
        )}
        {!lists && (
          <Tooltip
            content="Back"
            placement="bottom-end"
            className="text-white"
            color="primary"
          >
            <Button
              color="primary"
              isIconOnly
              onClick={() => router.push(`/${path}`)}
              className="rounded-full text-white"
            >
              <FaArrowLeft size={20} className="text-white" />
            </Button>
          </Tooltip>
        )}
      </div>
    </div>
  );
};

export default HeaderTable;
