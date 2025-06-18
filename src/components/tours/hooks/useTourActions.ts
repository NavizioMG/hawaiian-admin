// /src/components/tours/hooks/useTourActions.ts
import { useUpdate } from "@refinedev/core";

export const useTourActions = () => {
  const { mutate } = useUpdate();

  const handleToggle = (id: string, field: string, current: boolean) => {
    mutate({
      resource: "tours",
      id,
      values: { [field]: !current },
      mutationMode: "pessimistic",
    });
  };

  const handleBulkUpdate = (ids: string[], updates: Record<string, any>) => {
    ids.forEach((id: string) => {
      mutate({
        resource: "tours", 
        id,
        values: updates,
        mutationMode: "pessimistic",
      });
    });
  };

  return {
    handleToggle,
    handleBulkUpdate
  };
};