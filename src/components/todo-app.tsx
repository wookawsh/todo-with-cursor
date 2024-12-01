import { TodoApp } from "@/components/todo-app";'use client'

import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Trash2, Edit2 } from 'lucide-react'

type Todo = {
  id: number;
  text: string;
  completed: boolean;
}

function Header() {
  return (
    <header className="bg-primary text-primary-foreground py-4">
      <h1 className="text-2xl font-bold text-center">My To-Do List</h1>
    </header>
  )
}

function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground py-2 text-center">
      <p>&copy; 2024 To-Do App. All rights reserved.</p>
    </footer>
  )
}

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [newTodo, setNewTodo] = useState('')
  const [editingId, setEditingId] = useState<number | null>(null)

  const addTodo = () => {
    if (newTodo.trim() !== '') {
      setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }])
      setNewTodo('')
    }
  }

  const updateTodo = (id: number, newText: string) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, text: newText } : todo
    ))
    setEditingId(null)
  }

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const toggleComplete = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-4 flex">
          <Input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add a new task"
            className="mr-2"
          />
          <Button onClick={addTodo}>Add</Button>
        </div>
        <ul className="space-y-2">
          {todos.map(todo => (
            <li key={todo.id} className="flex items-center space-x-2 bg-muted p-2 rounded">
              <Checkbox
                checked={todo.completed}
                onCheckedChange={() => toggleComplete(todo.id)}
              />
              {editingId === todo.id ? (
                <Input
                  type="text"
                  value={todo.text}
                  onChange={(e) => updateTodo(todo.id, e.target.value)}
                  onBlur={() => setEditingId(null)}
                  autoFocus
                />
              ) : (
                <span className={`flex-grow ${todo.completed ? 'line-through text-muted-foreground' : ''}`}>
                  {todo.text}
                </span>
              )}
              <Button variant="ghost" size="icon" onClick={() => setEditingId(todo.id)}>
                <Edit2 className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => deleteTodo(todo.id)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </li>
          ))}
        </ul>
      </main>
      <Footer />
    </div>
  )
}

