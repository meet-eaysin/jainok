import React from "react";

export interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

export interface TimelineProps {
  data: TimelineEntry[];
}

export const Timeline: React.FC<TimelineProps> = ({ data }) => {
  return (
    <div className="relative w-full overflow-clip">
      <div className="mx-auto py-20 px-4 md:px-8 lg:px-10">
        <div className="mx-auto lg:mx-0 lg:max-w-none space-y-5">
          {data.map((item, index) => (
            <div key={index} className="flex flex-col group hover:shadow-lg transition-all duration-300 border-0 shadow-md bg-gradient-to-br from-background to-muted/20">
              <div className="flex flex-col justify-start md:flex-row md:items-center md:justify-start">
                <h3 className="text-2xl font-bold text-neutral-500 md:text-4xl dark:text-neutral-500">
                  {item.title}
                </h3>
              </div>
                <div className="flex flex-col items-start pt-2 pb-4">
                  {item.content}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};