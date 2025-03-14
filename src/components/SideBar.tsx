import { Home, Plus, Star, Trash } from "lucide-react";
import { Button } from "../components/ui/button";
import { Separator } from "../components/ui/separator";
import React from "react";

const SideBar = () => {
  return (
    <div className="hidden w-64 border-r p-4 md:block">
      <div className="mb-6">
        <Button variant="outline" className="w-full justify-start gap-2 pl-2.5">
          <Plus className="h-4 w-4" />
          New
        </Button>
      </div>

      <nav className="space-y-1">
        <Button variant="ghost" className="w-full justify-start gap-2 pl-2.5">
          <Home className="h-4 w-4" />
          My Drive
        </Button>
        <Button variant="ghost" className="w-full justify-start gap-2 pl-2.5">
          <Star className="h-4 w-4" />
          Starred
        </Button>
        <Button variant="ghost" className="w-full justify-start gap-2 pl-2.5">
          <Trash className="h-4 w-4" />
          Trash
        </Button>
      </nav>

      <Separator className="my-4" />

      <div className="space-y-1">
        <h3 className="px-2 text-sm font-medium">Storage</h3>
        <div className="px-2 py-1">
          <div className="h-2 rounded-full bg-muted">
            <div className="h-2 w-1/3 rounded-full bg-blue-500"></div>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            3.5 GB of 15 GB used
          </p>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
