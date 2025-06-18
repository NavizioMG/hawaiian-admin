import { useUpdate } from "@refinedev/core";

export const useTourActions = () => {
  const { mutate } = useUpdate();

  const handleToggle = (id, field, current) => {
    mutate({
      resource: "tours",
      id,
      values: { [field]: !current },
      mutationMode: "pessimistic",
    });
  };

  const handleBulkUpdate = (ids, updates) => {
    ids.forEach(id => {
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