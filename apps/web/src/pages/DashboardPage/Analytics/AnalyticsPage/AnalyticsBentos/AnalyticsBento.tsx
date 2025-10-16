import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowUp, ArrowDown } from "lucide-react";
import { SpinnerComponent } from "@/pages/Components/SpinnerComponent";

export type BentoStat = {
  id: string;
  title: string;
  description?: string;
  value: string | number;
  delta?: number | null; // positive or negative percent change
  deltaLabel?: string;
  icon?: React.ReactNode;
};

function TrendBadge({ delta }: { delta?: number | null }) {
  if (delta == null) return null;
  const isUp = delta >= 0;
  return (
    <span
      className={`inline-flex items-center gap-1 text-sm font-medium px-2 py-1 rounded-full ${
        isUp ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
      }`}
    >
      {isUp ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
      {Math.abs(delta)}%
    </span>
  );
}

type Props = {
  s: BentoStat
};

export const SingleAnalyticsBento: React.FC<Props> = ({ s }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let checkVal = s.value
    if (typeof checkVal == 'string') {
      checkVal = parseInt(checkVal)
    }
    if (checkVal > 0) {
      setLoading(false)
    }
  }, [s])

  return (
    <Card key={s.id} className="bg-white/60 shadow-sm flex justify-between gap-12 p-4 relative">
      <SpinnerComponent loading={loading} />
      <CardHeader className="flex items-start justify-between gap-3 p-0">
        <div>
          <CardTitle className="text-base font-semibold leading-none mb-1">{s.title}</CardTitle>
          {s.description && (
            <CardDescription className="text-xs text-muted-foreground">
              {s.description}
            </CardDescription>
          )}
        </div>
        {s.icon}
      </CardHeader>

      <CardContent className="flex items-center justify-between pt-2 p-0">
        <div>
          <div className="text-2xl font-semibold leading-none">{s.value}</div>
          {s.deltaLabel && (
            <div className="text-xs text-muted-foreground mt-1">{s.deltaLabel}</div>
          )}
        </div>

        <div className="flex items-end space-x-2 h-full">
          <TrendBadge delta={s.delta ?? null} />
        </div>
      </CardContent>
    </Card>
  );
}