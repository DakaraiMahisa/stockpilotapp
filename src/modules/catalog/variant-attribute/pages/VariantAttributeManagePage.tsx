import VariantAttributeSection from "../components/VariantAttributeSection";

const VariantAttributeManagePage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-text-primary">
          Variant Attributes
        </h1>

        <p className="mt-1 text-sm text-text-secondary">
          Manage reusable attributes and values used to define product variants.
        </p>
      </div>

      <VariantAttributeSection />
    </div>
  );
};

export default VariantAttributeManagePage;
