// Database types for Supabase
// These types are generated based on the database schema

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          avatar_url: string | null;
          subscription_tier: 'free' | 'paid';
          subscription_status: 'active' | 'canceled' | 'past_due' | 'trialing';
          stripe_customer_id: string | null;
          stripe_subscription_id: string | null;
          subscription_current_period_end: string | null;
          flows_created: number;
          flows_saved_today: number;
          flows_saved_reset_at: string;
          ai_suggestions_today: number;
          ai_suggestions_reset_at: string;
          default_flow_style: 'vinyasa' | 'hatha' | 'yin' | 'restorative' | 'power' | 'gentle' | 'prenatal' | 'custom';
          default_flow_duration: number;
          created_at: string;
          updated_at: string;
          last_login_at: string | null;
        };
        Insert: {
          id: string;
          email: string;
          full_name?: string | null;
          avatar_url?: string | null;
          subscription_tier?: 'free' | 'paid';
          subscription_status?: 'active' | 'canceled' | 'past_due' | 'trialing';
          stripe_customer_id?: string | null;
          stripe_subscription_id?: string | null;
          subscription_current_period_end?: string | null;
          flows_created?: number;
          flows_saved_today?: number;
          flows_saved_reset_at?: string;
          ai_suggestions_today?: number;
          ai_suggestions_reset_at?: string;
          default_flow_style?: 'vinyasa' | 'hatha' | 'yin' | 'restorative' | 'power' | 'gentle' | 'prenatal' | 'custom';
          default_flow_duration?: number;
          created_at?: string;
          updated_at?: string;
          last_login_at?: string | null;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string | null;
          avatar_url?: string | null;
          subscription_tier?: 'free' | 'paid';
          subscription_status?: 'active' | 'canceled' | 'past_due' | 'trialing';
          stripe_customer_id?: string | null;
          stripe_subscription_id?: string | null;
          subscription_current_period_end?: string | null;
          flows_created?: number;
          flows_saved_today?: number;
          flows_saved_reset_at?: string;
          ai_suggestions_today?: number;
          ai_suggestions_reset_at?: string;
          default_flow_style?: 'vinyasa' | 'hatha' | 'yin' | 'restorative' | 'power' | 'gentle' | 'prenatal' | 'custom';
          default_flow_duration?: number;
          created_at?: string;
          updated_at?: string;
          last_login_at?: string | null;
        };
      };
      poses: {
        Row: {
          id: string;
          slug: string;
          english_name: string;
          sanskrit_name: string | null;
          sanskrit_name_simplified: string | null;
          pose_type: 'standing' | 'seated' | 'prone' | 'supine' | 'inversion' | 'arm_balance' | 'twist' | 'backbend' | 'forward_fold' | 'hip_opener' | 'balance' | 'restorative';
          difficulty: 'beginner' | 'intermediate' | 'advanced';
          short_description: string;
          long_description: string | null;
          benefits: string[];
          cautions: string[];
          contraindications: string[];
          breath_cue: string | null;
          alignment_cues: string[];
          modifications: string[];
          step_by_step: string[];
          target_areas: ('shoulders' | 'chest' | 'upper_back' | 'lower_back' | 'core' | 'hips' | 'hamstrings' | 'quadriceps' | 'calves' | 'ankles' | 'wrists' | 'neck' | 'full_body')[];
          image_url: string | null;
          thumbnail_url: string | null;
          image_type: 'photo' | 'illustration';
          image_alt_text: string | null;
          meta_title: string | null;
          meta_description: string | null;
          is_published: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          english_name: string;
          sanskrit_name?: string | null;
          sanskrit_name_simplified?: string | null;
          pose_type: 'standing' | 'seated' | 'prone' | 'supine' | 'inversion' | 'arm_balance' | 'twist' | 'backbend' | 'forward_fold' | 'hip_opener' | 'balance' | 'restorative';
          difficulty: 'beginner' | 'intermediate' | 'advanced';
          short_description: string;
          long_description?: string | null;
          benefits?: string[];
          cautions?: string[];
          contraindications?: string[];
          breath_cue?: string | null;
          alignment_cues?: string[];
          modifications?: string[];
          step_by_step?: string[];
          target_areas?: ('shoulders' | 'chest' | 'upper_back' | 'lower_back' | 'core' | 'hips' | 'hamstrings' | 'quadriceps' | 'calves' | 'ankles' | 'wrists' | 'neck' | 'full_body')[];
          image_url?: string | null;
          thumbnail_url?: string | null;
          image_type?: 'photo' | 'illustration';
          image_alt_text?: string | null;
          meta_title?: string | null;
          meta_description?: string | null;
          is_published?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          slug?: string;
          english_name?: string;
          sanskrit_name?: string | null;
          sanskrit_name_simplified?: string | null;
          pose_type?: 'standing' | 'seated' | 'prone' | 'supine' | 'inversion' | 'arm_balance' | 'twist' | 'backbend' | 'forward_fold' | 'hip_opener' | 'balance' | 'restorative';
          difficulty?: 'beginner' | 'intermediate' | 'advanced';
          short_description?: string;
          long_description?: string | null;
          benefits?: string[];
          cautions?: string[];
          contraindications?: string[];
          breath_cue?: string | null;
          alignment_cues?: string[];
          modifications?: string[];
          step_by_step?: string[];
          target_areas?: ('shoulders' | 'chest' | 'upper_back' | 'lower_back' | 'core' | 'hips' | 'hamstrings' | 'quadriceps' | 'calves' | 'ankles' | 'wrists' | 'neck' | 'full_body')[];
          image_url?: string | null;
          thumbnail_url?: string | null;
          image_type?: 'photo' | 'illustration';
          image_alt_text?: string | null;
          meta_title?: string | null;
          meta_description?: string | null;
          is_published?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      pose_relationships: {
        Row: {
          id: string;
          pose_id: string;
          related_pose_id: string;
          relationship_type: 'related' | 'preparatory' | 'follow_up' | 'variation';
          created_at: string;
        };
        Insert: {
          id?: string;
          pose_id: string;
          related_pose_id: string;
          relationship_type: 'related' | 'preparatory' | 'follow_up' | 'variation';
          created_at?: string;
        };
        Update: {
          id?: string;
          pose_id?: string;
          related_pose_id?: string;
          relationship_type?: 'related' | 'preparatory' | 'follow_up' | 'variation';
          created_at?: string;
        };
      };
      flows: {
        Row: {
          id: string;
          user_id: string | null;
          title: string;
          description: string | null;
          style: 'vinyasa' | 'hatha' | 'yin' | 'restorative' | 'power' | 'gentle' | 'prenatal' | 'custom';
          level: 'beginner' | 'intermediate' | 'advanced';
          duration_minutes: number;
          is_public: boolean;
          public_slug: string | null;
          is_archived: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          title?: string;
          description?: string | null;
          style?: 'vinyasa' | 'hatha' | 'yin' | 'restorative' | 'power' | 'gentle' | 'prenatal' | 'custom';
          level?: 'beginner' | 'intermediate' | 'advanced';
          duration_minutes?: number;
          is_public?: boolean;
          public_slug?: string | null;
          is_archived?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string | null;
          title?: string;
          description?: string | null;
          style?: 'vinyasa' | 'hatha' | 'yin' | 'restorative' | 'power' | 'gentle' | 'prenatal' | 'custom';
          level?: 'beginner' | 'intermediate' | 'advanced';
          duration_minutes?: number;
          is_public?: boolean;
          public_slug?: string | null;
          is_archived?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      flow_items: {
        Row: {
          id: string;
          flow_id: string;
          pose_id: string;
          position: number;
          duration_seconds: number;
          side: 'both' | 'left' | 'right' | 'center';
          repetitions: number;
          breath_count: number | null;
          notes: string | null;
          transition_note: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          flow_id: string;
          pose_id: string;
          position: number;
          duration_seconds?: number;
          side?: 'both' | 'left' | 'right' | 'center';
          repetitions?: number;
          breath_count?: number | null;
          notes?: string | null;
          transition_note?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          flow_id?: string;
          pose_id?: string;
          position?: number;
          duration_seconds?: number;
          side?: 'both' | 'left' | 'right' | 'center';
          repetitions?: number;
          breath_count?: number | null;
          notes?: string | null;
          transition_note?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      ai_suggestion_logs: {
        Row: {
          id: string;
          user_id: string | null;
          suggestion_type: 'flow_generation' | 'pose_suggestion' | 'duration_optimization' | 'flow_analysis';
          input_data: Json;
          output_data: Json | null;
          tokens_used: number | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          suggestion_type: 'flow_generation' | 'pose_suggestion' | 'duration_optimization' | 'flow_analysis';
          input_data: Json;
          output_data?: Json | null;
          tokens_used?: number | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string | null;
          suggestion_type?: 'flow_generation' | 'pose_suggestion' | 'duration_optimization' | 'flow_analysis';
          input_data?: Json;
          output_data?: Json | null;
          tokens_used?: number | null;
          created_at?: string;
        };
      };
      exports: {
        Row: {
          id: string;
          user_id: string;
          flow_id: string;
          export_type: 'pdf' | 'link';
          file_url: string | null;
          expires_at: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          flow_id: string;
          export_type: 'pdf' | 'link';
          file_url?: string | null;
          expires_at?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          flow_id?: string;
          export_type?: 'pdf' | 'link';
          file_url?: string | null;
          expires_at?: string | null;
          created_at?: string;
        };
      };
      waitlist: {
        Row: {
          id: string;
          email: string;
          source: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          source?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          source?: string | null;
          created_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      pose_type: 'standing' | 'seated' | 'prone' | 'supine' | 'inversion' | 'arm_balance' | 'twist' | 'backbend' | 'forward_fold' | 'hip_opener' | 'balance' | 'restorative';
      difficulty_level: 'beginner' | 'intermediate' | 'advanced';
      body_area: 'shoulders' | 'chest' | 'upper_back' | 'lower_back' | 'core' | 'hips' | 'hamstrings' | 'quadriceps' | 'calves' | 'ankles' | 'wrists' | 'neck' | 'full_body';
      flow_style: 'vinyasa' | 'hatha' | 'yin' | 'restorative' | 'power' | 'gentle' | 'prenatal' | 'custom';
      subscription_tier: 'free' | 'paid';
      subscription_status: 'active' | 'canceled' | 'past_due' | 'trialing';
      image_type: 'photo' | 'illustration';
      pose_side: 'both' | 'left' | 'right' | 'center';
    };
  };
}
