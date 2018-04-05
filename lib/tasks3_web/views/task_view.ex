defmodule Tasks3Web.TaskView do
  use Tasks3Web, :view
  alias Tasks3Web.TaskView

  def render("index.json", %{tasks: tasks}) do
    %{data: render_many(tasks, TaskView, "task.json")}
  end

  def render("show.json", %{task: task}) do
    %{data: render_one(task, TaskView, "task.json")}
  end

  def render("task.json", %{task: task}) do
    %{id: task.id,
      description: task.description,
      task_completed: task.task_completed,
      title: task.title,
      time_taken: task.time_taken,
      user_assigned: render_one(task.user_assigned, Tasks3Web.UserView, "user.json") 
    }
  end
end
