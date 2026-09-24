import { useMemo, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { Plus } from "lucide-react";

import { Button, Card, Modal } from "@/components/ui";
import EmptyState from "@/components/feedback/EmptyState";
import Skeleton from "@/components/feedback/Skeleton";
import PageHeader from "@/components/common/PageHeader";
import { PERMISSIONS } from "@/constants/permissions";
import { usePermissions } from "@/hooks/usePermissions";

import {
  useDeletePriceList,
  usePriceLists,
  useUpdatePriceList,
} from "../hooks/usePriceLists";
import type { PriceList } from "../types/priceList.types";
import { PriceListForm } from "../components/PriceListForm";
import PriceListTable from "../components/PriceListTable";
import PriceListItemManager from "../components/PriceListItemManager";

const PricingPage = () => {
  const { hasPermission } = usePermissions();

  const canRead = hasPermission(PERMISSIONS.CATALOG_PRICING_READ);
  const canCreate = hasPermission(PERMISSIONS.CATALOG_PRICING_CREATE);
  const canUpdate = hasPermission(PERMISSIONS.CATALOG_PRICING_UPDATE);
  const canDelete = hasPermission(PERMISSIONS.CATALOG_PRICING_DELETE);

  const [page, setPage] = useState(0);
  const [size] = useState(20);

  const [editingPriceList, setEditingPriceList] = useState<PriceList | null>(
    null,
  );

  const [isFormOpen, setIsFormOpen] = useState(false);

  const [managingPriceList, setManagingPriceList] = useState<PriceList | null>(
    null,
  );

  const [deletingPriceList, setDeletingPriceList] = useState<PriceList | null>(
    null,
  );

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const params = useMemo(
    () => ({
      page,
      size,
      sort: "name,asc",
    }),
    [page, size],
  );

  const {
    data: priceListsResponse,
    isLoading,
    isError,
    error,
  } = usePriceLists(params.page, params.size, params.sort);

  const updatePriceList = useUpdatePriceList();
  const deletePriceList = useDeletePriceList();

  if (!canRead) {
    return <Navigate to="/dashboard" replace />;
  }

  const priceLists = priceListsResponse?.data?.content ?? [];
  const pagination = priceListsResponse?.data;

  const openCreateForm = () => {
    setEditingPriceList(null);
    setIsFormOpen(true);
  };

  const openEditForm = (priceList: PriceList) => {
    setEditingPriceList(priceList);
    setIsFormOpen(true);
  };

  const closeForm = () => {
    if (updatePriceList.isPending) {
      return;
    }

    setIsFormOpen(false);
    setEditingPriceList(null);
  };

  const handleFormSuccess = () => {
    setIsFormOpen(false);
    setEditingPriceList(null);
  };

  const openManageItems = (priceList: PriceList) => {
    setManagingPriceList(priceList);
  };

  const closeManageItems = () => {
    setManagingPriceList(null);
  };

  const handleActivate = async (priceList: PriceList) => {
    if (!canUpdate || updatePriceList.isPending) {
      return;
    }

    try {
      await updatePriceList.mutateAsync({
        priceListId: priceList.id,
        request: {
          name: priceList.name,
          priceListType: priceList.priceListType,
          validFrom: priceList.validFrom ?? undefined,
          validTo: priceList.validTo ?? undefined,
          defaultList: priceList.defaultList,
          active: true,
        },
      });
    } catch {
      // Global API error handling.
    }
  };

  const handleDeactivate = async (priceList: PriceList) => {
    if (!canUpdate || updatePriceList.isPending) {
      return;
    }

    try {
      await updatePriceList.mutateAsync({
        priceListId: priceList.id,
        request: {
          name: priceList.name,
          priceListType: priceList.priceListType,
          validFrom: priceList.validFrom ?? undefined,
          validTo: priceList.validTo ?? undefined,
          defaultList: priceList.defaultList,
          active: false,
        },
      });
    } catch {
      // Global API error handling.
    }
  };

  const openDeleteConfirmation = (priceList: PriceList) => {
    setDeletingPriceList(priceList);
    setIsDeleteOpen(true);
  };

  const closeDeleteConfirmation = () => {
    if (deletePriceList.isPending) {
      return;
    }

    setDeletingPriceList(null);
    setIsDeleteOpen(false);
  };

  const handleDelete = async () => {
    if (!deletingPriceList || !canDelete || deletePriceList.isPending) {
      return;
    }

    try {
      await deletePriceList.mutateAsync(deletingPriceList.id);

      closeDeleteConfirmation();

      if (priceLists.length === 1 && page > 0) {
        setPage((currentPage) => currentPage - 1);
      }
    } catch {
      // Global API error handling.
    }
  };

  const handlePreviousPage = () => {
    if (page > 0) {
      setPage((currentPage) => currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (pagination && page < pagination.totalPages - 1) {
      setPage((currentPage) => currentPage + 1);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <PageHeader
          title="Pricing"
          description="Manage price lists and product pricing rules."
        />

        <Card className="p-6">
          <Skeleton className="h-10 w-full" />
          <div className="mt-4 space-y-3">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        </Card>
      </div>
    );
  }

  if (isError) {
    let message = "Failed to load price lists.";

    if (axios.isAxiosError(error)) {
      message = error.response?.data?.message ?? error.message ?? message;
    }

    return (
      <div className="space-y-6">
        <PageHeader
          title="Pricing"
          description="Manage price lists and product pricing rules."
        />

        <Card className="p-6">
          <EmptyState
            title="Unable to load price lists"
            description={message}
          />
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <PageHeader
          title="Pricing"
          description="Manage price lists and product pricing rules."
        />

        {canCreate && (
          <Button type="button" variant="primary" onClick={openCreateForm}>
            <Plus className="mr-2 size-4" />
            Create Price List
          </Button>
        )}
      </div>

      <Card className="overflow-hidden">
        {priceLists.length === 0 ? (
          <div className="p-6">
            <EmptyState
              title="No price lists"
              description="Create a price list to start defining product and variant pricing."
              action={
                canCreate ? (
                  <Button
                    type="button"
                    variant="primary"
                    onClick={openCreateForm}
                  >
                    <Plus className="mr-2 size-4" />
                    Create Price List
                  </Button>
                ) : undefined
              }
            />
          </div>
        ) : (
          <>
            <PriceListTable
              priceLists={priceLists}
              loading={false}
              onEdit={openEditForm}
              onManageItems={openManageItems}
              onActivate={handleActivate}
              onDeactivate={handleDeactivate}
              onDelete={openDeleteConfirmation}
            />

            {pagination && pagination.totalPages > 1 && (
              <div className="flex items-center justify-between border-t border-border px-4 py-3">
                <p className="text-sm text-text-secondary">
                  Page {page + 1} of {pagination.totalPages}
                </p>

                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handlePreviousPage}
                    disabled={page === 0}
                  >
                    Previous
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleNextPage}
                    disabled={page >= pagination.totalPages - 1}
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </Card>

      <Modal
        open={isFormOpen}
        onClose={closeForm}
        title={editingPriceList ? "Edit Price List" : "Create Price List"}
      >
        <PriceListForm
          priceList={editingPriceList}
          onSuccess={handleFormSuccess}
          onCancel={closeForm}
        />
      </Modal>

      <Modal
        open={Boolean(managingPriceList)}
        onClose={closeManageItems}
        title={
          managingPriceList
            ? `Manage Items — ${managingPriceList.name}`
            : "Manage Price List Items"
        }
      >
        {managingPriceList && (
          <PriceListItemManager priceList={managingPriceList} />
        )}
      </Modal>

      <Modal
        open={isDeleteOpen}
        onClose={closeDeleteConfirmation}
        title="Delete Price List"
      >
        <div className="space-y-5">
          <p className="text-sm text-text-secondary">
            Are you sure you want to delete{" "}
            <span className="font-medium text-text-primary">
              {deletingPriceList?.name}
            </span>
            ? This action will remove the price list from active use.
          </p>

          <div className="flex items-center justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={closeDeleteConfirmation}
              disabled={deletePriceList.isPending}
            >
              Cancel
            </Button>

            <Button
              type="button"
              variant="danger"
              loading={deletePriceList.isPending}
              onClick={handleDelete}
            >
              Delete Price List
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default PricingPage;
