"use client";

import * as React from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface CalendarSchedulerProps {
  title?: string;
  timeSlots?: string[];
  onConfirm?: (value: { date?: Date; time?: string }) => void;
  onChange?: (value: { date?: Date; time?: string }) => void;
  confirmDisabled?: boolean;
  summary?: string;
  children?: React.ReactNode;
}

function CalendarScheduler({
  title = "Schedule a Meeting",
  timeSlots = [
    "08:00 AM",
    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "01:00 PM",
    "02:00 PM",
    "03:00 PM",
    "04:00 PM",
    "05:00 PM",
  ],
  onConfirm,
  onChange,
  confirmDisabled = false,
  summary,
  children,
}: CalendarSchedulerProps) {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [time, setTime] = React.useState<string | undefined>();

  const update = (next: { date?: Date; time?: string }) => {
    if ("date" in next) setDate(next.date);
    if ("time" in next) setTime(next.time);
    onChange?.({ date, time, ...next });
  };

  return (
    <div>
      <Card className="w-full shadow-none border-none bg-background">
        {title && (
          <CardHeader className="p-4 pb-3">
            <CardTitle className="text-base">{title}</CardTitle>
          </CardHeader>
        )}
        <CardContent
          className={cn("flex flex-col gap-4 p-4 sm:flex-row", title && "pt-0")}
        >
          {/* Calendar Section */}
          <div className="flex-1 border rounded-md p-2">
            <Calendar
              mode="single"
              selected={date}
              onSelect={(d) => update({ date: d })}
              disabled={{ before: new Date() }}
              className="rounded-md"
            />
          </div>

          {/* Time Slots Section */}
          <div className="flex max-h-[320px] flex-1 flex-col rounded-md border p-2">
            <p className="mb-2 text-sm font-medium text-muted-foreground">
              Pick a time
            </p>
            <div className="grid grid-cols-2 gap-2 overflow-y-auto p-1">
              {timeSlots.map((slot) => (
                <Button
                  key={slot}
                  variant={time === slot ? "default" : "outline"}
                  size="sm"
                  className={cn(
                    "w-full transition-[transform,color,background-color] active:scale-95",
                    time === slot && "ring-2 ring-primary",
                  )}
                  onClick={() =>
                    update({ time: time === slot ? undefined : slot })
                  }
                >
                  {slot}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
        {children}
        <CardFooter className="flex items-center justify-between gap-3 p-4 pt-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => update({ date: undefined, time: undefined })}
          >
            Reset
          </Button>
          {summary && (
            <span className="min-w-0 truncate text-center text-xs font-medium text-muted-foreground transition-opacity">
              {summary}
            </span>
          )}
          <Button
            size="sm"
            onClick={() => onConfirm?.({ date, time })}
            disabled={!date || !time || confirmDisabled}
          >
            Confirm
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export { CalendarScheduler };
