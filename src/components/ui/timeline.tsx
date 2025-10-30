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
        <div className="mx-auto lg:mx-0 lg:max-w-none space-y-8">
          {data.map((item, index) => (
            <div key={index} className="relative">              
              <div className="flex flex-col group hover:shadow-xl transition-all duration-500 border-0 shadow-lg bg-gradient-to-br from-background via-muted/5 to-background/80 backdrop-blur-sm rounded-2xl p-6 md:p-8">
                
                <div className="flex flex-col justify-start md:flex-row md:items-center md:justify-between md:gap-8">
                  <h3 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent md:text-4xl pl-8 md:pl-0">
                    {item.title}
                  </h3>
                </div>
                <div className="flex flex-col items-start pt-4 pb-2 pl-8 md:pl-0">
                  {item.content}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
