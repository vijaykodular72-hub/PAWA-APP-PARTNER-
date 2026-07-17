import { supabase } from '../lib/supabase';

export const uploadAvatar = async (file: File, userId: string) => {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${userId}-${Date.now()}.${fileExt}`;
    const filePath = `${fileName}`;

    // We use 'avatars' bucket as requested. 
    // If it doesn't exist, Supabase returns 404 Bucket not found.
    const { error: uploadError } = await supabase.storage
      .from('avatars')
      .upload(filePath, file, {
        upsert: true
      });

    if (uploadError) {
      if (uploadError.message.toLowerCase().includes('bucket not found')) {
        console.warn('Supabase storage bucket "avatars" not found. Using local object URL as fallback.');
        return { publicUrl: URL.createObjectURL(file), error: null, isFallback: true };
      }
      throw uploadError;
    }

    const { data: { publicUrl } } = supabase.storage
      .from('avatars')
      .getPublicUrl(filePath);

    return { publicUrl, error: null, isFallback: false };
  } catch (error: any) {
    console.error('Error uploading avatar:', error);
    // Fallback to local URL so user can still see the image and proceed with UI state
    return { publicUrl: URL.createObjectURL(file), error, isFallback: true };
  }
};
