import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { uploadImage } from "../API/image";
import { showNotification } from "../store/slices/notificationSlice";
import { PopUpType } from "../store/slices/notificationSlice/types";
import { DetailedItem, ProductCategory } from "../assets/@types/Item";
import { checkItemCodeAvailability } from "../API/item";

// Helper: Returns an empty item form structure
const createEmptyForm = (): DetailedItem => ({
  name: "",
  wholesalePrice: 0,
  sellingPrice: 0,
  photo_key: "",
  category: ProductCategory.OTHER,
  params: [{ color: "", code: "", stock: [{ size: "", quantity: 0 }] }],
});

/**
 * Custom React hook for managing item form logic in Marte ERP.
 * Handles state, validation, async operations, and navigation.
 */
export const useItemForm = (
  onSubmit: ({ item }: { item: DetailedItem }) => Promise<void>,
  defaultForm?: DetailedItem | null
) => {
  const [form, setForm] = useState<DetailedItem>(
    defaultForm ?? createEmptyForm()
  );
  const [image, setImage] = useState<File | null>(null);
  const [formErrors, setFormErrors] = useState<Record<string, any>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  /** Updates top-level fields (name, price, category...) */
  const updateField = <T extends keyof DetailedItem>(
    field: T,
    value: DetailedItem[T]
  ) => setForm((prev) => ({ ...prev, [field]: value }));

  /** Updates color or code values */
  const updateColor = (index: number, value: string) =>
    setForm((prev) => ({
      ...prev,
      params: prev.params.map((p, i) =>
        i === index ? { ...p, color: value } : p
      ),
    }));

  const updateCode = (index: number, value: string) =>
    setForm((prev) => ({
      ...prev,
      params: prev.params.map((p, i) =>
        i === index ? { ...p, code: value } : p
      ),
    }));

  /** Updates size/quantity for a color */
  const updateSize = (
    colorIndex: number,
    sizeIndex: number,
    value: string,
    prop: "size" | "quantity"
  ) => {
    const updated = [...form.params];
    const target = updated[colorIndex].stock[sizeIndex];
    target[prop] = prop === "quantity" ? parseInt(value) || 0 : value;
    setForm({ ...form, params: updated });
  };

  /** Adds/removes fields dynamically */
  const addColorField = () =>
    setForm((prev) => ({
      ...prev,
      params: [
        ...prev.params,
        { color: "", code: "", stock: [{ size: "", quantity: 0 }] },
      ],
    }));

  const addSizeField = (colorIndex: number) => {
    const updated = [...form.params];
    updated[colorIndex].stock.push({ size: "", quantity: 0 });
    setForm({ ...form, params: updated });
  };

  const deleteColorField = (colorIndex: number) => {
    const updated = [...form.params];
    updated.splice(colorIndex, 1);
    setForm({ ...form, params: updated });
  };

  const deleteSize = (colorIndex: number, sizeIndex: number) => {
    const updated = [...form.params];
    updated[colorIndex].stock.splice(sizeIndex, 1);
    setForm({ ...form, params: updated });
  };

  /** Form validation including async code availability check */
  const validateForm = async () => {
    const errors: Record<string, any> = {};

    if (!form.name.trim()) errors.name = true;
    if (form.wholesalePrice < 0) errors.wholesalePrice = true;
    if (form.sellingPrice < 0) errors.sellingPrice = true;

    for (let i = 0; i < form.params.length; i++) {
      const p = form.params[i];
      const paramErrors: any = {};

      if (!p.color.trim()) paramErrors.color = true;
      if (!p.code.trim()) paramErrors.code = true;
      else {
        const skipCheck = defaultForm?.params[i]?.code === p.code;
        if (!skipCheck) {
          const { available } = await checkItemCodeAvailability(p.code);
          if (!available) paramErrors.code = true;
        }
      }

      p.stock.forEach((s, j) => {
        const stockErrors: any = {};
        if (!s.size.trim()) stockErrors.size = true;
        if (s.quantity < 0) stockErrors.quantity = true;
        if (Object.keys(stockErrors).length)
          (paramErrors.stock ??= {})[j] = stockErrors;
      });

      if (Object.keys(paramErrors).length)
        (errors.params ??= {})[i] = paramErrors;
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  /** Cancels editing and navigates back */
  const handleCancel = () => navigate("/stocks");

  /** Handles form submission (with image upload + notification) */
  const handleSubmit = async () => {
    if (isSubmitting) return;
    const isValid = await validateForm();
    if (!isValid) return;

    setIsSubmitting(true);
    try {
      if (image) {
        const res = await uploadImage(image);
        form.photo_key = res || "";
      }

      await onSubmit({ item: form });
      navigate("/stocks");

      dispatch(
        showNotification({
          message: "ნივთი წარმატებით დაემატა!",
          type: PopUpType.SUCCESS,
        })
      );

      setForm(createEmptyForm());
      setImage(null);
    } finally {
      setTimeout(() => setIsSubmitting(false), 2000);
    }
  };

  return {
    formContext: {
      form,
      setForm,
      imageData: { image, setImage },
      handlers: {
        updateField,
        updateColor,
        updateCode,
        updateSize,
        addColorField,
        addSizeField,
        deleteColorField,
        deleteSize,
        validateForm,
        handleSubmit,
        handleCancel,
      },
      formErrors,
      isSubmitting,
    },
  };
};

export type ItemFormContextType = ReturnType<typeof useItemForm>["formContext"];
