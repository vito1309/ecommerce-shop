import { OrderStatus } from "@/cases/orders/dtos/order.dtos";

type OrderStatusBadgeProps = {
  status: string;
};

export function OrderStatusBadge({ status }: OrderStatusBadgeProps) {
  const statusInfo = OrderStatus.find((s) => s.value === status);

  if (!statusInfo) {
    return (
      <div className="px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-800">
        {status}
      </div>
    );
  }

  return (
    <div
      className={`px-2 py-1 rounded text-xs font-medium border ${statusInfo.bg} ${statusInfo.border} ${statusInfo.text}`}
    >
      {statusInfo.label}
    </div>
  );
}
