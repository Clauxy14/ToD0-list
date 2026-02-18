import type { PersistQueryClientOptions } from "@tanstack/react-query-persist-client";
import { QueryClient } from "@tanstack/react-query";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";

export const createPersistOptions = (
  queryClient: QueryClient,
): PersistQueryClientOptions => ({
  queryClient,
  persister: createSyncStoragePersister({
    storage: window.localStorage,
    key: "tanstack-query",
    serialize: (data: unknown) => JSON.stringify(data),
    deserialize: (data: string) => JSON.parse(data),
  }),
  maxAge: 1000 * 60 * 60 * 24, // 24 hours
  buster: "1",
});
