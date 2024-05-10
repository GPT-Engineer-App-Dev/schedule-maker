import { useState } from 'react';
import { Box, Button, Container, Flex, IconButton, Input, List, ListItem, Text, useToast, VStack } from '@chakra-ui/react';
import { FaTrash, FaEdit, FaSave, FaPlus } from 'react-icons/fa';

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');
  const toast = useToast();

  const addTask = () => {
    if (input.trim() === '') {
      toast({
        title: 'Cannot add empty task.',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    setTasks([...tasks, { id: Date.now(), text: input, isEditing: false }]);
    setInput('');
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const editTask = (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, isEditing: true } : task));
  };

  const saveTask = (id, newText) => {
    if (newText.trim() === '') {
      toast({
        title: 'Cannot save empty task.',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    setTasks(tasks.map(task => task.id === id ? { ...task, text: newText, isEditing: false } : task));
  };

  return (
    <Container maxW="container.md" py={8}>
      <Flex as="nav" mb={4} justify="space-between" align="center">
        <Text fontSize="2xl" fontWeight="bold">Todo App</Text>
      </Flex>
      <VStack spacing={4}>
        <Flex>
          <Input placeholder="Add a new task..." value={input} onChange={(e) => setInput(e.target.value)} />
          <IconButton icon={<FaPlus />} ml={2} onClick={addTask} aria-label="Add task" />
        </Flex>
        <List w="full">
          {tasks.map(task => (
            <ListItem key={task.id} d="flex" justifyContent="space-between" alignItems="center" p={2} borderWidth="1px" borderRadius="lg">
              {task.isEditing ? (
                <Input defaultValue={task.text} onChange={(e) => saveTask(task.id, e.target.value)} />
              ) : (
                <Text>{task.text}</Text>
              )}
              <Flex>
                {task.isEditing ? (
                  <IconButton icon={<FaSave />} onClick={() => saveTask(task.id, task.text)} aria-label="Save task" />
                ) : (
                  <IconButton icon={<FaEdit />} onClick={() => editTask(task.id)} aria-label="Edit task" />
                )}
                <IconButton icon={<FaTrash />} ml={2} onClick={() => deleteTask(task.id)} aria-label="Delete task" />
              </Flex>
            </ListItem>
          ))}
        </List>
      </VStack>
    </Container>
  );
};

export default Index;