import { GIFT_IDS } from "@/lib/gifts";

export type GiverPayload = {
  name: string;
  contactNumber: string;
  item: string;
  quantity: number;
  message: string | null;
};

export type GiverValidationResult =
  | { ok: true; data: GiverPayload }
  | { ok: false; error: string };

export function validateGiverPayload(body: unknown): GiverValidationResult {
  const b = (body ?? {}) as Record<string, unknown>;
  const name = String(b.name ?? "").trim();
  const contactNumber = String(b.contactNumber ?? "").trim();
  const item = String(b.item ?? "").trim();
  const quantity = Number(b.quantity);
  const message = String(b.message ?? "").trim() || null;

  if (!name || !contactNumber || !item) {
    return { ok: false, error: "Please fill in all fields." };
  }
  if (!Number.isFinite(quantity) || quantity < 1) {
    return { ok: false, error: "Quantity must be at least 1." };
  }

  return { ok: true, data: { name, contactNumber, item, quantity, message } };
}

export type ReceiverPayload = {
  name: string;
  contactNumber: string;
  gift1: string;
  gift2: string | null;
  message: string | null;
};

export type ReceiverValidationResult =
  | { ok: true; data: ReceiverPayload }
  | { ok: false; error: string };

export function validateReceiverPayload(body: unknown): ReceiverValidationResult {
  const b = (body ?? {}) as Record<string, unknown>;
  const name = String(b.name ?? "").trim();
  const contactNumber = String(b.contactNumber ?? "").trim();
  const gift1 = String(b.gift1 ?? "").trim();
  const gift2 = b.gift2 ? String(b.gift2).trim() : null;
  const message = String(b.message ?? "").trim() || null;

  if (Array.isArray(b.gifts) && b.gifts.length > 2) {
    return { ok: false, error: "You can only choose two gifts." };
  }

  if (!name || !contactNumber || !gift1) {
    return { ok: false, error: "Please fill in all fields and choose a gift." };
  }
  if (!GIFT_IDS.has(gift1)) {
    return { ok: false, error: "Invalid gift selection." };
  }
  if (gift2 && (!GIFT_IDS.has(gift2) || gift2 === gift1)) {
    return { ok: false, error: "Invalid second gift selection." };
  }

  return { ok: true, data: { name, contactNumber, gift1, gift2, message } };
}

export type GivingMethod = "secret" | "open";
export type DonationType = "monetary" | "in-kind";

export type CharityPayload = {
  givingMethod: GivingMethod;
  name: string | null;
  codeName: string | null;
  contactNumber: string | null;
  donationType: DonationType;
  item: string | null;
  quantity: number | null;
  message: string | null;
  proofOfPayment: string | null;
};

// ~2.7MB base64 text, corresponding to roughly a 2MB original image file.
const MAX_PROOF_DATA_URL_LENGTH = 3_000_000;

export type CharityValidationResult =
  | { ok: true; data: CharityPayload }
  | { ok: false; error: string };

export function validateCharityPayload(body: unknown): CharityValidationResult {
  const b = (body ?? {}) as Record<string, unknown>;
  const givingMethod = String(b.givingMethod ?? "").trim();
  const donationType = String(b.donationType ?? "").trim();
  const message = String(b.message ?? "").trim() || null;

  if (givingMethod !== "secret" && givingMethod !== "open") {
    return { ok: false, error: "Please choose how you'd like to give." };
  }
  if (donationType !== "monetary" && donationType !== "in-kind") {
    return { ok: false, error: "Please choose a type of donation." };
  }

  let name: string | null = null;
  let codeName: string | null = null;
  let contactNumber: string | null = null;

  if (givingMethod === "open") {
    name = String(b.name ?? "").trim();
    contactNumber = String(b.contactNumber ?? "").trim();
    if (!name) {
      return {
        ok: false,
        error: "Please share your name, or choose Give Secretly instead.",
      };
    }
    if (!contactNumber) {
      return { ok: false, error: "Please provide a contact number." };
    }
  } else {
    codeName = String(b.codeName ?? "").trim() || null;
  }

  let item: string | null = null;
  let quantity: number | null = null;
  if (donationType === "in-kind") {
    item = String(b.item ?? "").trim();
    quantity = Number(b.quantity);
    if (!item) {
      return { ok: false, error: "Please describe the item you'd like to donate." };
    }
    if (!Number.isFinite(quantity) || quantity < 1) {
      return { ok: false, error: "Quantity must be at least 1." };
    }
  }

  let proofOfPayment: string | null = null;
  if (donationType === "monetary" && !b.isCash) {
    proofOfPayment = String(b.proofOfPayment ?? "").trim();
    if (!proofOfPayment || !proofOfPayment.startsWith("data:image/")) {
      return {
        ok: false,
        error: "Please attach a proof of your transaction (a screenshot or photo).",
      };
    }
    if (proofOfPayment.length > MAX_PROOF_DATA_URL_LENGTH) {
      return { ok: false, error: "Proof of transaction image is too large (max 2MB)." };
    }
  }

  return {
    ok: true,
    data: {
      givingMethod,
      name,
      codeName,
      contactNumber,
      donationType,
      item,
      quantity,
      message,
      proofOfPayment,
    },
  };
}
