import { Button } from "@/components/ui/button";

interface RoleChipsProps {
  roles: string[];
  activeRole?: string;
  onRoleSelect: (role: string) => void;
}

export const RoleChips = ({ roles, activeRole, onRoleSelect }: RoleChipsProps) => {
  return (
    <div className="flex flex-wrap gap-2">
      {roles.map((role) => (
        <Button
          key={role}
          variant="chip"
          size="sm"
          onClick={() => onRoleSelect(role)}
          className={activeRole === role ? "bg-primary text-primary-foreground" : ""}
        >
          {role}
        </Button>
      ))}
    </div>
  );
};
