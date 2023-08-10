# Task Manager App

A simple task manager application built using React and Material-UI.

## Table of Contents

- [Introduction](#introduction)
- [Components](#components)
- [Features](#features)
- - [Add and Manage Tasks](#add-and-manage-tasks)
- - [Dark Mode Support](#dark-mode-support)
- [Demo](#demo)
- [Installation](#installation)
- [Usage](#usage)
- [Technologies Used](#technologies-used)


## Introduction

The Task Manager App is a user-friendly web application designed to help you organize and manage your tasks efficiently. It provides an intuitive interface for adding, updating, and deleting tasks, with an optional dark mode for enhanced visibility.

## Components

### CustomModal

A reusable custom modal component for displaying forms or content.

### TaskForm

A form component for adding new tasks to the task list.

### EditTaskForm

A form component for editing existing tasks.

### TaskCheck

A component to toggle the status of a task between completed and pending.

### handleDelete

A utility function to handle task deletion using Axios.

### CustomThemeProvider

A custom theme provider for managing light/dark mode.

## Features

### Add and Manage Tasks

- Add new tasks with a title and status (pending or completed).
- Mark tasks as completed or pending with a simple checkbox.
- Delete tasks that are no longer needed.
- Edit task details using a modal form.



### Dark Mode Support

- Toggle between light and dark mode for different visual preferences.

## Demo

- Click on the image below to see the demo ^^

[![App demo](https://img.youtube.com/vi/4JgSnBwc4y4/0.jpg)](https://youtu.be/4JgSnBwc4y4)




## Installation

1. Clone the repository: `git clone https://github.com/mvicente88/ToDoApp-Frontend.git`
2. Navigate to the project directory: `cd ToDoApp-Frontend`
3. Install dependencies: `npm install`

## Usage

1. Start the development server: `npm start`
2. Open your web browser and visit `http://localhost:3000`

## Technologies Used

- React: A JavaScript library for building user interfaces.
- Material-UI: A popular UI framework for creating modern and responsive design components.
- Axios: A promise-based HTTP client for making API requests.
- CustomThemeProvider: A custom theme provider for managing light/dark mode.


