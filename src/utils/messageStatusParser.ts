export enum MessageStatus {
  Pending = 0,
  Accepted = 1,
  Rejected = 2,
  Blocked = 3,
  Unsent = 4,
  Kicked = 5,
}

export default function messageStatusParser(status: number): string {
  switch (status) {
    case MessageStatus.Pending:
      return "Pending";
    case MessageStatus.Accepted:
      return "Accepted";
    case MessageStatus.Rejected:
      return "Rejected";
    case MessageStatus.Blocked:
      return "Blocked";
    case MessageStatus.Unsent:
      return "Unsent";
    case MessageStatus.Kicked:
      return "Kicked";
    default:
      return "Unknown";
  }
}
