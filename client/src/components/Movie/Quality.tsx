import styled from '@emotion/styled';
import { ToggleButton, Box, ToggleButtonGroup } from '@mui/material';
import { useEffect } from 'react';
import { Torrent } from '../../types';

const QualityButton = styled(ToggleButton)({
	color: '#001489',
	backgroundColor: '#ffffff5e',
	'&.Mui-selected, &.Mui-selected:hover': {
		color: 'white',
		backgroundColor: '#001489'
	}
});

const QualityContainer = styled(Box)`
	display: flex;
	justify-content: flex-end;
`;

const Quality = ({
	torrents,
	quality: qualityObj,
	playHandle
}: {
	torrents: Torrent[];
	quality: {
		setValue: React.Dispatch<React.SetStateAction<string | undefined>>;
		value: string | undefined;
		onChange: (_event: React.MouseEvent<HTMLElement, MouseEvent>, value: string) => void;
	};
	playHandle: () => void;
}) => {
	const { setValue: setQuality, ...quality } = qualityObj;

	useEffect(() => {
		setQuality(torrents[0].quality || undefined);
	}, [setQuality, torrents]);

	return (
		<QualityContainer>
			<ToggleButtonGroup exclusive {...quality} onClick={playHandle}>
				{torrents
					.filter((torrent, index, self) => {
						if (
							(torrent.quality === '720p' ||
								torrent.quality === '1080p' ||
								torrent.quality === '3D') &&
							self.findIndex((obj) => obj.quality === torrent.quality) === index
						)
							return true;
						return false;
					})
					.map((torrent, index) => {
						return (
							<QualityButton key={index} value={torrent.quality} size="small">
								{torrent.quality}
							</QualityButton>
						);
					})}
			</ToggleButtonGroup>
		</QualityContainer>
	);
};

export default Quality;
