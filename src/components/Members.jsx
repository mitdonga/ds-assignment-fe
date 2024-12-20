import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@mui/material';

export default function Members( { members } ) {

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <Box>
      {members.length > 0 ? (
        <Box>
          <Typography variant="h4" gutterBottom>
            Members
          </Typography>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell align="right">Email</TableCell>
                  <TableCell align="right">Referral Code</TableCell>
                  <TableCell align="right">Joined At</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {members.map((member) => (
                  <TableRow
                    key={member.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {member.name}
                    </TableCell>
                    <TableCell align="right">{member.email}</TableCell>
                    <TableCell align="right">{member.referral_code}</TableCell>
                    <TableCell align="right">{formatDate(member.created_at)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      ) : 
        <Box>
          <Typography variant="h4" gutterBottom>
            No members yet
          </Typography>
        </Box>
      }
    </Box>
  );
}