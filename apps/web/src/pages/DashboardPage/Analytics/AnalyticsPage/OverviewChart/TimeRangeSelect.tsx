import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

type Props = {
  timeRange: string
  setTimeRange: React.Dispatch<React.SetStateAction<string>>
};

export const TimeRangeSelect: React.FC<Props> = ({ timeRange, setTimeRange }) => {

  return (
    <>
      <Select value={timeRange} onValueChange={setTimeRange}>
        <SelectTrigger
          className="hidden w-[160px] rounded-lg sm:ml-auto sm:flex"
          aria-label="Select a value"
        >
          <SelectValue placeholder="Last 3 months" />
        </SelectTrigger>
        <SelectContent className="rounded-xl">
          <SelectItem value="3 months" className="rounded-lg">
            Last 3 months
          </SelectItem>
          <SelectItem value="30 days" className="rounded-lg">
            Last 30 days
          </SelectItem>
          <SelectItem value="7 days" className="rounded-lg">
            Last 7 days
          </SelectItem>
        </SelectContent>
      </Select>
    </>
  );
};