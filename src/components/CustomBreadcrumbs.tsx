import { TbSlash } from "react-icons/tb";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { LuChevronDown } from "react-icons/lu";
import { capitalizeFirst } from "@/lib/formatters";

interface CustomBreadcrumbsProps {
  tags?: string[];
  title?: string;
}

const CustomBreadcrumbs = ({ tags, title }: CustomBreadcrumbsProps) => {
  return (
    <div className="w-full px-4 cursor-none">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/" className="cursor-none" data-interactive>
              Inicio
            </BreadcrumbLink>
          </BreadcrumbItem>
          {tags ? (
            <>
              <BreadcrumbSeparator>
                <TbSlash />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <DropdownMenu>
                  <DropdownMenuTrigger
                    className="flex items-center gap-1 cursor-none"
                    data-interactive
                  >
                    Tags
                    <LuChevronDown />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    {tags?.map((tag) => (
                      <DropdownMenuItem
                        key={tag}
                        className="cursor-none"
                        data-interactive
                      >
                        <BreadcrumbLink
                          href={`/notes/${
                            tag !== "notes" && tag !== "notas" ? tag : ""
                          }`}
                          className="w-full h-full cursor-none"
                        >
                          {capitalizeFirst(tag)}
                        </BreadcrumbLink>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </BreadcrumbItem>
            </>
          ) : null}
          {title ? (
            <>
              <BreadcrumbSeparator>
                <TbSlash />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbPage>{capitalizeFirst(title)}</BreadcrumbPage>
              </BreadcrumbItem>
            </>
          ) : null}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};

export default CustomBreadcrumbs;
