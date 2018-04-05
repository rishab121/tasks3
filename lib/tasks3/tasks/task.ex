defmodule Tasks3.Tasks.Task do
  use Ecto.Schema
  import Ecto.Changeset


  schema "tasks" do
    field :description, :string, null: false
    field :task_completed, :boolean, default: false
    field :time_taken, :integer, null: false, default: 0
    field :title, :string, null: false
    #field :user_assigned_id, :id
    belongs_to :user_assigned, Tasks3.Users.User

    timestamps()
  end

  @doc false
  def changeset(task, attrs) do
    task
    |> cast(attrs, [:description, :task_completed, :title, :time_taken, :user_assigned_id])
    |> validate_required([:description, :task_completed, :title, :time_taken, :user_assigned_id])
  end
end
