"use client";

import { useState } from "react";
import {
  ChevronRight,
  File,
  FileText,
  Folder,
  Image,
  MoreVertical,
  Upload,
} from "lucide-react";

import { Button } from "../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { Input } from "../components/ui/input";
import { ScrollArea } from "../components/ui/scroll-area";
import SideBar from "~/components/SideBar";

interface FileItem {
  id: string;
  name: string;
  type: "document" | "spreadsheet" | "presentation" | "pdf" | "image";
  url: string;
  size: string;
  modified: string;
}

interface FolderItem {
  id: string;
  name: string;
  type: "folder";
  children: string[];
}

type DriveItem = FileItem | FolderItem;

interface BreadcrumbItem {
  id: string;
  name: string;
}

const isFolder = (item: DriveItem): item is FolderItem => {
  return item.type === "folder";
};

const mockData: Record<string, DriveItem | undefined> = {
  root: {
    id: "root",
    name: "My Drive",
    type: "folder",
    children: ["folder1", "folder2", "file1", "file2", "file3"],
  },
  folder1: {
    id: "folder1",
    name: "Documents",
    type: "folder",
    children: ["folder3", "file4", "file5"],
  },
  folder2: {
    id: "folder2",
    name: "Images",
    type: "folder",
    children: ["file6", "file7"],
  },
  folder3: {
    id: "folder3",
    name: "Work",
    type: "folder",
    children: ["file8"],
  },
  file1: {
    id: "file1",
    name: "Project Proposal.docx",
    type: "document",
    url: "#",
    size: "245 KB",
    modified: "Mar 12, 2025",
  },
  file2: {
    id: "file2",
    name: "Budget.xlsx",
    type: "spreadsheet",
    url: "#",
    size: "132 KB",
    modified: "Mar 10, 2025",
  },
  file3: {
    id: "file3",
    name: "Presentation.pptx",
    type: "presentation",
    url: "#",
    size: "4.2 MB",
    modified: "Mar 8, 2025",
  },
  file4: {
    id: "file4",
    name: "Meeting Notes.docx",
    type: "document",
    url: "#",
    size: "78 KB",
    modified: "Mar 5, 2025",
  },
  file5: {
    id: "file5",
    name: "Contract.pdf",
    type: "pdf",
    url: "#",
    size: "1.2 MB",
    modified: "Feb 28, 2025",
  },
  file6: {
    id: "file6",
    name: "Profile Picture.jpg",
    type: "image",
    url: "#",
    size: "1.8 MB",
    modified: "Mar 1, 2025",
  },
  file7: {
    id: "file7",
    name: "Banner.png",
    type: "image",
    url: "#",
    size: "2.4 MB",
    modified: "Feb 25, 2025",
  },
  file8: {
    id: "file8",
    name: "Report.pdf",
    type: "pdf",
    url: "#",
    size: "3.5 MB",
    modified: "Mar 7, 2025",
  },
};

export default function GoogleDriveUI(): JSX.Element {
  const [currentFolder, setCurrentFolder] = useState<string>("root");
  const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbItem[]>([
    { id: "root", name: "My Drive" },
  ]);

  const navigateToFolder = (folderId: string, folderName: string): void => {
    const existingIndex = breadcrumbs.findIndex(
      (crumb) => crumb.id === folderId,
    );

    if (existingIndex >= 0) {
      setBreadcrumbs(breadcrumbs.slice(0, existingIndex + 1));
    } else {
      setBreadcrumbs([...breadcrumbs, { id: folderId, name: folderName }]);
    }

    setCurrentFolder(folderId);
  };

  const currentFolderData = mockData[currentFolder] as FolderItem | undefined;
  const folderContents: DriveItem[] =
    currentFolderData && isFolder(currentFolderData)
      ? currentFolderData.children
          .map((id) => mockData[id])
          .filter((item): item is DriveItem => !!item)
      : [];

  const getFileIcon = (type: FileItem["type"]): JSX.Element => {
    switch (type) {
      case "image":
        return <Image className="h-5 w-5 text-blue-500" />;
      case "document":
        return <FileText className="h-5 w-5 text-blue-500" />;
      case "pdf":
        return <FileText className="h-5 w-5 text-red-500" />;
      case "spreadsheet":
        return <FileText className="h-5 w-5 text-green-500" />;
      case "presentation":
        return <FileText className="h-5 w-5 text-orange-500" />;
      default:
        return <File className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <div className="flex h-screen bg-background">
      <SideBar />

      <div className="flex-1 overflow-hidden">
        <header className="flex h-14 items-center border-b px-4">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-semibold">Google Drive</h1>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <Upload className="h-4 w-4" />
                  Upload
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Upload files</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="rounded-lg border-2 border-dashed p-10 text-center">
                    <Upload className="mx-auto h-10 w-10 text-muted-foreground" />
                    <p className="mt-2 text-sm font-medium">
                      Drag and drop files here or click to browse
                    </p>
                    <Input
                      type="file"
                      className="mx-auto mt-4 max-w-xs"
                      multiple
                    />
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </header>

        <div className="flex items-center gap-1 border-b px-4 py-2">
          {breadcrumbs.map((crumb, index) => (
            <div key={crumb.id} className="flex items-center">
              {index > 0 && (
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigateToFolder(crumb.id, crumb.name)}
                className="h-auto px-2 py-1"
              >
                {crumb.name}
              </Button>
            </div>
          ))}
        </div>

        <ScrollArea className="h-[calc(100vh-8.5rem)]">
          <div className="p-4">
            <div className="grid grid-cols-1 gap-2">
              {folderContents.length === 0 ? (
                <div className="py-12 text-center text-muted-foreground">
                  <p>This folder is empty</p>
                </div>
              ) : (
                folderContents.map((item: DriveItem) => (
                  <div
                    key={item.id}
                    className="group flex items-center justify-between rounded-lg border p-3 hover:bg-muted"
                  >
                    <div className="flex items-center gap-3">
                      {item.type === "folder" ? (
                        <Folder className="h-5 w-5 text-blue-500" />
                      ) : (
                        getFileIcon(item.type)
                      )}

                      {item.type === "folder" ? (
                        <button
                          onClick={() => navigateToFolder(item.id, item.name)}
                          className="font-medium hover:underline"
                        >
                          {item.name}
                        </button>
                      ) : (
                        <a
                          href={item.url}
                          className="font-medium hover:underline"
                        >
                          {item.name}
                        </a>
                      )}
                    </div>

                    <div className="flex items-center gap-4">
                      {item.type !== "folder" && (
                        <>
                          <span className="hidden text-sm text-muted-foreground md:inline">
                            {item.modified}
                          </span>
                          <span className="hidden text-sm text-muted-foreground md:inline">
                            {item.size}
                          </span>
                        </>
                      )}

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 opacity-0 group-hover:opacity-100"
                          >
                            <MoreVertical className="h-4 w-4" />
                            <span className="sr-only">More</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Download</DropdownMenuItem>
                          <DropdownMenuItem>Rename</DropdownMenuItem>
                          <DropdownMenuItem>Move to</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
