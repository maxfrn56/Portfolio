import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { Resend } from 'resend';

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  message: z.string().min(10),
});

// Resend sera initialisé dans la fonction POST si la clé API est disponible

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = contactSchema.parse(body);

    // Vérifier que la clé API Resend est configurée
    if (!process.env.RESEND_API_KEY) {
      if (process.env.NODE_ENV === 'development') {
        console.error('❌ RESEND_API_KEY n\'est pas configurée dans les variables d\'environnement');
        console.error('📝 Pour configurer: créez un fichier .env.local avec RESEND_API_KEY=votre_cle');
        console.log('📧 Message reçu (mode développement - email non envoyé):');
        console.log('Nom:', validatedData.name);
        console.log('Email:', validatedData.email);
        console.log('Téléphone:', validatedData.phone || 'Non renseigné');
        console.log('Message:', validatedData.message);
        
        return NextResponse.json(
          { 
            message: 'Message reçu (mode développement)',
            error: 'RESEND_API_KEY non configurée. Consultez la console serveur pour voir les détails.',
            development: true
          },
          { status: 200 }
        );
      }
      
      return NextResponse.json(
        { 
          error: 'Configuration serveur manquante. Veuillez configurer RESEND_API_KEY.',
          details: 'La clé API Resend n\'est pas configurée. Consultez la documentation pour plus d\'informations.'
        },
        { status: 500 }
      );
    }

    // Vérifier que l'email de destination est configuré
    const recipientEmail = process.env.CONTACT_EMAIL || 'contact@maximefarineau.com';

    // Initialiser Resend seulement si la clé est présente
    const resendInstance = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

    if (!resendInstance) {
      throw new Error('Impossible d\'initialiser Resend');
    }

    // Envoyer l'email via Resend
    const { data, error } = await resendInstance.emails.send({
      from: 'Portfolio Contact <contact@maximefarineau.com>',
      to: [recipientEmail],
      replyTo: validatedData.email,
      subject: `Nouveau message de contact de ${validatedData.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #5a8fa3; border-bottom: 2px solid #5a8fa3; padding-bottom: 10px;">
            Nouveau message de contact
          </h2>
          
          <div style="margin-top: 20px;">
            <p><strong>Nom:</strong> ${validatedData.name}</p>
            <p><strong>Email:</strong> <a href="mailto:${validatedData.email}">${validatedData.email}</a></p>
            ${validatedData.phone ? `<p><strong>Téléphone:</strong> <a href="tel:${validatedData.phone.replace(/\s/g, '')}">${validatedData.phone}</a></p>` : ''}
          </div>
          
          <div style="margin-top: 30px; padding: 15px; background-color: #f5f5f5; border-left: 4px solid #5a8fa3;">
            <h3 style="color: #333; margin-top: 0;">Message:</h3>
            <p style="color: #555; white-space: pre-wrap;">${validatedData.message.replace(/\n/g, '<br>')}</p>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #888; font-size: 12px;">
            <p>Ce message a été envoyé depuis le formulaire de contact du portfolio.</p>
          </div>
        </div>
      `,
      text: `
Nouveau message de contact

Nom: ${validatedData.name}
Email: ${validatedData.email}
${validatedData.phone ? `Téléphone: ${validatedData.phone}` : ''}

Message:
${validatedData.message}
      `,
    });

    if (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('❌ Erreur Resend:', JSON.stringify(error, null, 2));
      }
      return NextResponse.json(
        { 
          error: 'Erreur lors de l\'envoi de l\'email',
          details: error.message || 'Erreur inconnue de Resend'
        },
        { status: 500 }
      );
    }

    if (process.env.NODE_ENV === 'development') {
      console.log('✅ Email envoyé avec succès:', data?.id);
    }

    return NextResponse.json(
      { message: 'Message envoyé avec succès', id: data?.id },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Données invalides', details: error.errors },
        { status: 400 }
      );
    }

    if (process.env.NODE_ENV === 'development') {
      console.error('❌ Erreur lors de l\'envoi du message:', error);
    }
    const errorMessage = error instanceof Error ? error.message : 'Erreur inconnue';
    
    return NextResponse.json(
      { 
        error: 'Erreur serveur',
        details: errorMessage
      },
      { status: 500 }
    );
  }
}

