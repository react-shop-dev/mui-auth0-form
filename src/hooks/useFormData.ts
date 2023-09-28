export const useFormData = (data: object) => {
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    formData.append(key, value);
  });

  // @ts-ignore FormData
  return new URLSearchParams(formData);
};
