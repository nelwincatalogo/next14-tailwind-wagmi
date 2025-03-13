export interface IVerify {
  status: number;
  message: string;
  token: string;
  user: IUser;
  is_admin: boolean;
}

export interface IUser {
  id: number;
  username?: string;
  userid?: string;
  user_type?: number;
  user_available?: number;
  last_login_date?: string;
  user_block?: number;
  email?: string;
  play_time?: string;
  session_id?: null;
  user_dna?: number;
  otp_secret?: null;
  last_dna_claimed_date?: string;
  characters?: unknown[];
  blockchain_address?: string;
  user_id?: number;
  created_at?: string;
  updated_at?: string;
  oat_claim_timestamp?: null;
  discord_id?: string;
  bridge_status?: number;
  user?: IUser;
}
