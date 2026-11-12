/**
 * TRUSTLANCE Supabase Service
 * Connects to Supabase PostgreSQL, Auth, and Storage when configured.
 * Seamlessly integrates with DemoDataService for offline judging.
 */
import { createClient } from '@supabase/supabase-js';
import { loadProjectState, saveProjectState } from './demoDataService';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);

export const supabase = isSupabaseConfigured
  ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  : null;

/**
 * Storage Upload Simulation / Live Storage
 */
export async function uploadDeliverableFile(file, milestoneId) {
  if (isSupabaseConfigured && supabase) {
    try {
      const fileName = `${milestoneId}/${Date.now()}_${file.name}`;
      const { data, error } = await supabase.storage
        .from('deliverables')
        .upload(fileName, file);

      if (error) throw error;
      const { data: publicUrlData } = supabase.storage
        .from('deliverables')
        .getPublicUrl(fileName);

      return {
        url: publicUrlData.publicUrl,
        name: file.name,
        size: file.size,
      };
    } catch (err) {
      console.warn('Supabase storage upload failed, falling back:', err);
    }
  }

  // Local URL simulation
  return {
    url: URL.createObjectURL(file),
    name: file.name,
    size: file.size,
    isLocal: true,
  };
}

/**
 * Add event to Trust Timeline
 */
export async function recordTrustEvent({
  projectId,
  actorName,
  actorRole,
  type,
  title,
  description,
  metadata = {},
}) {
  const event = {
    id: `tl_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
    day: metadata.day || 7,
    timestamp: new Date().toLocaleString(),
    actor: actorName,
    role: actorRole,
    type,
    title,
    description,
    metadata,
  };

  const state = loadProjectState();
  state.trustTimeline.unshift(event);
  saveProjectState(state);

  if (isSupabaseConfigured && supabase) {
    try {
      await supabase.from('trust_timeline').insert({
        project_id: projectId,
        actor_name: actorName,
        actor_role: actorRole,
        event_type: type,
        title,
        description,
        metadata_json: metadata,
      });
    } catch (err) {
      console.warn('Failed to insert into supabase trust_timeline:', err);
    }
  }

  return event;
}
