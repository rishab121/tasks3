defmodule Tasks3.Repo.Migrations.CreateTasks do
  use Ecto.Migration

  def change do
    create table(:tasks) do
      add :description, :text
      add :task_completed, :boolean, default: false, null: false
      add :title, :string
      add :time_taken, :integer
      add :user_assigned_id, references(:users, on_delete: :delete_all)

      timestamps()
    end

    create index(:tasks, [:user_assigned_id])
  end
end
