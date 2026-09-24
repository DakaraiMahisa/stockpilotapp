import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Navigate } from "react-router-dom";

import { PageHeader } from "@/components/common";
import { EmptyState, Skeleton } from "@/components/feedback";
import { Button, Card, Modal } from "@/components/ui";
import { PERMISSIONS } from "@/constants/permissions";
import { usePermissions } from "@/hooks/usePermissions";

import BrandForm from "../components/BrandForm";
import BrandTable from "../components/BrandTable";
import {
  useBrands,
  useCreateBrand,
  useUpdateBrand,
  useDeleteBrand,
  useActivateBrand,
} from "../hooks/useBrand";
import {
  brandCreateSchema,
  type BrandCreateFormValues,
} from "../schema/brand.schemas";
import type { Brand } from "../types/brand.types";

const BrandManagePage = () => {
  const [formOpen, setFormOpen] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);

  const { hasPermission } = usePermissions();

  const canRead = hasPermission(PERMISSIONS.BRAND_READ);
  const canCreate = hasPermission(PERMISSIONS.BRAND_CREATE);
  const canUpdate = hasPermission(PERMISSIONS.BRAND_UPDATE);
  const canDelete = hasPermission(PERMISSIONS.BRAND_DELETE);

  const { data, isLoading, isError } = useBrands();

  const createBrand = useCreateBrand();
  const updateBrand = useUpdateBrand();
  const deleteBrand = useDeleteBrand();
  const activateBrand = useActivateBrand();

  const form = useForm<BrandCreateFormValues>({
    resolver: zodResolver(brandCreateSchema),
    defaultValues: {
      name: "",
      code: "",
      logoObjectKey: "",
      website: "",
    },
  });

  useEffect(() => {
    if (!formOpen) {
      form.reset();
      return;
    }

    if (selectedBrand) {
      form.reset({
        name: selectedBrand.name,
        code: selectedBrand.code,
        logoObjectKey: selectedBrand.logoObjectKey ?? "",
        website: selectedBrand.website ?? "",
      });
      return;
    }

    form.reset({
      name: "",
      code: "",
      logoObjectKey: "",
      website: "",
    });
  }, [formOpen, selectedBrand, form]);

  if (!canRead) {
    return <Navigate to="/dashboard" replace />;
  }

  if (isLoading) {
    return <Skeleton className="h-96 w-full" />;
  }

  if (isError || !data?.data) {
    return (
      <EmptyState
        title="Unable to load brands"
        description="Please refresh the page or try again later."
      />
    );
  }

  const brands = data.data.content;

  const editing = selectedBrand !== null;

  const handleCreate = () => {
    if (!canCreate) {
      return;
    }

    setSelectedBrand(null);
    setFormOpen(true);
  };

  const handleEdit = (brand: Brand) => {
    if (!canUpdate) {
      return;
    }

    setSelectedBrand(brand);
    setFormOpen(true);
  };

  const handleCloseForm = () => {
    setFormOpen(false);
    setSelectedBrand(null);
    form.reset();
  };

  const handleSubmit = async (values: BrandCreateFormValues) => {
    if (editing && selectedBrand) {
      if (!canUpdate) {
        return;
      }

      await updateBrand.mutateAsync({
        brandId: selectedBrand.id,
        request: {
          name: values.name,
          code: values.code,
          logoObjectKey: values.logoObjectKey,
          website: values.website,
        },
      });
    } else {
      if (!canCreate) {
        return;
      }

      await createBrand.mutateAsync({
        name: values.name,
        code: values.code,
        logoObjectKey: values.logoObjectKey,
        website: values.website,
      });
    }

    handleCloseForm();
  };

  const handleDeactivate = async (brand: Brand) => {
    if (!canDelete) {
      return;
    }

    await deleteBrand.mutateAsync(brand.id);
  };

  const handleActivate = async (brand: Brand) => {
    if (!canUpdate) {
      return;
    }

    await activateBrand.mutateAsync(brand.id);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Brand Management"
        description="Create and manage the brands available in your product catalog."
      >
        {canCreate && (
          <Button
            type="button"
            variant="primary"
            size="md"
            onClick={handleCreate}
          >
            Create Brand
          </Button>
        )}
      </PageHeader>

      <Card>
        {brands.length === 0 ? (
          <EmptyState
            title="No brands found"
            description="Create your first brand to start organizing your product catalog."
          />
        ) : (
          <BrandTable
            brands={brands}
            onEdit={handleEdit}
            onDeactivate={handleDeactivate}
            onActivate={handleActivate}
          />
        )}
      </Card>

      <Modal
        open={formOpen}
        onClose={handleCloseForm}
        title={editing ? "Edit Brand" : "Create Brand"}
        size="lg"
      >
        <BrandForm
          form={form}
          submitting={createBrand.isPending || updateBrand.isPending}
          editing={editing}
          onSubmit={handleSubmit}
          onCancel={handleCloseForm}
        />
      </Modal>
    </div>
  );
};

export default BrandManagePage;
