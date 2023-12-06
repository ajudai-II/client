import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetDonationsByCategory } from '@/queries/donationQuerie';
import CardMyDonations from '@/components/Cards/Donations/CardMyDonations';
import { Box, Spinner } from '@chakra-ui/react';

const CategoryPage = () => {
  const { category } = useParams();
  
  const categoryString = category || "defaultCategory";

  const { data, isLoading, isError } = useGetDonationsByCategory(categoryString);

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" h="100vh">
        <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" size="xl" />
      </Box>
    );
  }

  if (isError) {
    return <p>Ocorreu um erro ao buscar os pedidos.</p>;
  }

  return (
    <Box>
      <CardMyDonations data={data?.data} />
    </Box>
  );
};

export default CategoryPage;
