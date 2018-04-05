# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     Tasks3.Repo.insert!(%Tasks3.SomeSchema{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.
defmodule Seeds do
    alias Tasks3.Repo
    alias Tasks3.Users.User
    alias Tasks3.Tasks.Task

    def run do
      p = Comeonin.Argon2.hashpwsalt("password1")
      Repo.delete_all(User)
      a = Repo.insert!(%User{ name: "alice", email: "alice@gmail.com", password_hash: p })
      b = Repo.insert!(%User{ name: "bob", email: "bob@gmail.com", password_hash: p})
      c = Repo.insert!(%User{ name: "carol", email: "carol@gmail.com", password_hash: p})
      d = Repo.insert!(%User{ name: "dave", email: "dave@gmail.com", password_hash: p})
  
      Repo.delete_all(Task)
      Repo.insert!(%Task{ user_assigned_id: a.id, description: "Task of. Alice", title: "task1" })
      Repo.insert!(%Task{ user_assigned_id: b.id, description: "Task of. Bob", title: "task2" })
      Repo.insert!(%Task{ user_assigned_id: b.id, description: "Task of. Bob Again", title: "task3" })
      Repo.insert!(%Task{ user_assigned_id: c.id, description: "Task of. Carol", title: "task4" })
      Repo.insert!(%Task{ user_assigned_id: d.id, description: "Task of. Dave", title: "task5" })
    end
  end
  
  Seeds.run