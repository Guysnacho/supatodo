import { Box, Divider, Heading, Text, Tag } from "@chakra-ui/react";
import Head from "next/head";

const SingleTodo = ({ todo }) => {
    const getDateInMonthDayYear = (date) => {
        const d = new Date(date);
        const options = {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric"
        };
        const n = d.toLocaleDateString("en-US", options);
        console.log("This is what the date is pre regex formatting");
        const replace = n.replace(new RegExp(",", "g"), " ");
        return replace;
    };

    return (
        <Box
            position="relative"
            maxW="sm"
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            p="4"
        >
            <Heading side="md" mt="3">{todo.title}</Heading>
            <Tag
                position="absolute"
                top="3"
                right="2"
                bg={todo.isComplete ? "green.500" : "yellow.400"}
                borderRadius="3x1"
                size="sm"
            />
            <Text color="gray.400" mt="1" fontSize="sm">
                {getDateInMonthDayYear(todo.insertedat)}
            </Text>
            <Divider my="4" />
            <Text noOfLines={[1,2,3]} color="gray.800">
                {todo.description}
            </Text>
        </Box>
    );
};
export default SingleTodo;