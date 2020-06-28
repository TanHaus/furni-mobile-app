import React from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { PreviewCard } from "components";

export const ListingCardsGrid = (props) => {
  const { navigation, listings } = props;
  return (
    <ListingsWrapper>
      {listings &&
        listings.map((listing) => (
          <TouchableOpacity
            key={listing.listingId}
            onPress={() =>
              navigation.navigate("listing", { listingId: listing.listingId })
            }
          >
            <PreviewCard listing={listing} />
          </TouchableOpacity>
        ))}
    </ListingsWrapper>
  );
};

// ---------------------------------------------------------------------------
// STYLING
// ---------------------------------------------------------------------------
const ListingsWrapper = styled.View`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
`;
