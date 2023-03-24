import React from "react";
import PopupWithForm from "./PopupWithForm";
import useFormWithValidation from "../hooks/useFormWithValidation";

function DeletePopup({ isOpen, onClose, card, onDeleteCard, isLoading }) {
  // вычитываем валидность из кастомного хука
  const { isValid } = useFormWithValidation({});

  // метод нажатия на кнопку
  function handleSubmit(e) {
    e.preventDefault();
    onDeleteCard(card);
  }

  return (
    <PopupWithForm
      title="Вы уверены?"
      name="delete"
      textButton={isLoading ? "Удаляю" : "Да"}
      onSubmit={handleSubmit}
      isOpen={isOpen}
      onClose={onClose}
      isValid={!isValid}
    />
  );
}

export default DeletePopup;
