// Configuration pour l'envoi d'emails
// Note: L'envoi d'emails est géré directement dans app/api/contact/route.ts avec Resend

export interface ContactEmailData {
  name: string;
  email: string;
  message: string;
}

